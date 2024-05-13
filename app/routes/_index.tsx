import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Link } from "~/components/Link";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { putToast } from "~/services/toast.server";

export async function action() {
  const headers = await putToast({
    type: "success",
    message: "Test notification!",
  });
  return redirect("/", { headers });
}

export default function Index() {
  return (
    <Box>
      <Flex justify="between">
        <Heading size="6">Remix PostgreSQL Railway template</Heading>
        <ThemeSwitcher />
      </Flex>
      <p>
        A <Link to="https://railway.app/">Railway</Link> template based on{" "}
        <Link to="https://remix.run">Remix</Link>,{" "}
        <Link to="https://www.postgresql.org/">PostgreSQL</Link>{" "}
        <small>
          (via <Link to="https://www.prisma.io/">Prisma</Link>)
        </small>{" "}
        and <Link to="https://www.radix-ui.com/">Radix UI</Link>.
      </p>
      <p>This starter comes with some batteries included:</p>
      <ul>
        <li>Database migrations are automatically applied when deployed</li>
        <li>
          Password-based authentication (incl. user registration and session
          management)
        </li>
        <li>
          An example for a protected route (try visiting{" "}
          <code>
            <Link to="/protected">/protected</Link>
          </code>
          )
        </li>
        <li>Dark mode and theme switcher (try above)</li>
        <li>
          <Flex gap="2">
            A notification service (
            <Form method="post">
              <Button size="1" variant="soft">
                Show test notification
              </Button>
            </Form>
            )
          </Flex>
        </li>
      </ul>
      <Flex gap="2" direction="column">
        <Link to="/register">Register a test account</Link>
        <Link to="/login">Log in to your test account</Link>
      </Flex>
    </Box>
  );
}
