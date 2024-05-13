import { Text } from "@radix-ui/themes";
import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { AuthForm } from "~/components/AuthForm";
import { CenteredMediumContaner } from "~/components/CenteredMediumContainer";
import { Link } from "~/components/Link";
import { authenticator } from "~/services/authentication.server";
import { putToast } from "~/services/toast.server";

export default function Login() {
  return (
    <CenteredMediumContaner>
      <AuthForm headline="Log in" actionLabel="Login" />
      <Text as="p" size="2" mt="4" align="right">
        Don’t have an account yet? <Link to="/register">Register one here</Link>
        .
      </Text>
    </CenteredMediumContaner>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      throwOnError: true,
    });
  } catch (error) {
    // Remix throws responses, so we can just return it here
    if (error instanceof Response) return error;

    const headers = await putToast({
      type: "error",
      message: "Wrong credentials, try again!",
    });
    return redirect("/login", { headers });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/protected",
  });
}
