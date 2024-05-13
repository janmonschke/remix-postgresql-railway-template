import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Button,
  Container,
  ContainerProps,
  Flex,
  Theme,
} from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";
import { extractUserPreferencesFromCookie } from "./services/user-preferences.server";
import { popToast } from "./services/toast.server";
import { Toast } from "./components/Toast";
import { CenteredMediumContaner } from "./components/CenteredMediumContainer";
import { InitialThemeContext } from "./helpers/initial-theme-context";

import "./root.css";

export const meta: MetaFunction = () => {
  return [{ title: "Remix Postgres Railway starter" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [{ toast, headers }, userPreferences] = await Promise.all([
    popToast(request),
    extractUserPreferencesFromCookie(request),
  ]);

  return json({ toast, theme: userPreferences.theme }, { headers });
}

const layoutPadding: ContainerProps["px"] = { initial: "4", md: "0" };
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const theme = data?.theme || "light";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={theme}>
        <Theme>
          <InitialThemeContext.Provider value={theme}>
            <>
              <Container size="2" pt="6" px={layoutPadding}>
                {children}
              </Container>
              <Toast toast={data?.toast} />
            </>
          </InitialThemeContext.Provider>
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as unknown as Error;

  return (
    <CenteredMediumContaner>
      <h1>
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : "An error occurred"}
      </h1>
      {error?.message ? <p>{error.message}</p> : null}
      <p>
        <Link to="/" reloadDocument>
          <Button color="gray" variant="soft">
            <Flex align="center" gap="2">
              <HomeIcon /> Back to home
            </Flex>
          </Button>
        </Link>
      </p>
    </CenteredMediumContaner>
  );
}

export default function App() {
  return <Outlet />;
}
