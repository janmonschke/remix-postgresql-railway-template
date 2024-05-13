import { Heading } from "@radix-ui/themes";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "~/components/Link";
import { authenticator } from "~/services/authentication.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  return json({ user });
}

export default function Protected() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <section>
      <Heading size="6" mb="4">
        You are signed in as {user.name}!
      </Heading>
      <Link to="/">Go back home</Link>
    </section>
  );
}
