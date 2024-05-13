import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { Form } from "@remix-run/react";

export function AuthForm({
  actionLabel,
  headline,
}: {
  actionLabel: string;
  headline: string;
}) {
  return (
    <section>
      <Heading as="h1" size="7">
        {headline}
      </Heading>

      <Form method="post">
        <Flex direction="column" gap="3">
          <div>
            <label htmlFor="name">Username:</label>
            <TextField.Root name="name" id="name" minLength={3} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <TextField.Root
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              minLength={5}
            />
          </div>
          <div>
            <Button type="submit">{actionLabel}</Button>
          </div>
        </Flex>
      </Form>
    </section>
  );
}
