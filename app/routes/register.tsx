import { Text } from "@radix-ui/themes";
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { ZodError } from "zod";
import { AuthForm } from "~/components/AuthForm";
import { CenteredMediumContaner } from "~/components/CenteredMediumContainer";
import { Link } from "~/components/Link";

import { db } from "~/db.server";
import { generatePasswordHash } from "~/helpers/passwords";
import { RegisterUserDTO } from "~/helpers/types";
import { authenticator } from "~/services/authentication.server";
import { putToast } from "~/services/toast.server";

export default function Register() {
  return (
    <CenteredMediumContaner>
      <AuthForm headline="Register" actionLabel="Register" />
      <Text as="p" size="2" mt="4" align="right">
        Already have an account? <Link to="/login">Log in here</Link>.
      </Text>
    </CenteredMediumContaner>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = Object.fromEntries(await request.formData());

  try {
    const { name, password } = RegisterUserDTO.parse(body);

    const passwordHash = await generatePasswordHash(password);
    await db.user.create({
      data: {
        name,
        passwordHash,
      },
    });
    const headers = await putToast({
      type: "success",
      message: "Your account was registered. You can log in now.",
    });
    return redirect("/login", { headers });
  } catch (e) {
    let errorReason = "generic reason";

    if (e instanceof ZodError) {
      errorReason = e.errors.reduce((errorMessage, error) => {
        const path = error.path.join(".");
        return `- ${path}: ${error.message}\n${errorMessage}`;
      }, "");
    }

    const headers = await putToast({
      type: "error",
      message: "Was not able to create a new user: " + errorReason,
    });
    throw redirect("/register", { headers });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
