import { ActionFunctionArgs, json } from "@remix-run/node";
import { UserPreferences, UserPreferencesDTO } from "~/helpers/types";
import { userPreferencesSessionStorage } from "~/services/user-preferences.server";

export async function action({ request }: ActionFunctionArgs) {
  const preferencesSession = await userPreferencesSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const body = Object.fromEntries(await request.formData());

  const preferencesFromRequest = UserPreferencesDTO.safeParse(body).data;

  if (!preferencesFromRequest) {
    return json({ ok: false });
  }

  Object.keys(preferencesFromRequest).map((key) => {
    const typedKey = key as unknown as keyof UserPreferences;
    const value = preferencesFromRequest[typedKey];
    if (value) {
      preferencesSession.set(typedKey, value);
    }
  });

  return json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": await userPreferencesSessionStorage.commitSession(
          preferencesSession
        ),
      },
    }
  );
}
