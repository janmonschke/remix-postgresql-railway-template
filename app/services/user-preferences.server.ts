import { createCookieSessionStorage } from "@remix-run/node";
import { UserPreferences, UserPreferencesSchema } from "~/helpers/types";

export const userPreferencesSessionStorage =
  createCookieSessionStorage<UserPreferences>({
    cookie: {
      name: "UserPreferences",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 100,
      httpOnly: true,
      secrets: [process.env.COOKIE_SECRET ?? "s3cr3t"],
      secure: process.env.NODE_ENV === "production",
    },
  });

export async function extractUserPreferencesFromCookie(
  request: Request
): Promise<UserPreferences> {
  const userPreferencesSession = await userPreferencesSessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return UserPreferencesSchema.parse(userPreferencesSession.data);
}
