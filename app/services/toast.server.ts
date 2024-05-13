import { createCookieSessionStorage } from "@remix-run/node";
import { Toast } from "~/helpers/types";

const { getSession, commitSession } = createCookieSessionStorage<{
  toast: Toast;
}>({
  cookie: {
    name: "toast",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.COOKIE_SECRET ?? "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function putToast(toast: Toast, headers = new Headers()) {
  const session = await getSession();
  session.flash("toast", toast);
  headers.set("Set-Cookie", await commitSession(session));
  return headers;
}

export async function popToast(request: Request, headers = new Headers()) {
  const session = await getSession(request.headers.get("Cookie"));
  const toast = session.get("toast") as Toast | undefined;
  headers.set("Set-Cookie", await commitSession(session));
  return { toast, headers };
}
