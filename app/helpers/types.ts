import { z } from "zod";

export const ValidThemes = z.enum(["light", "dark"]).default("light");
export type Theme = z.infer<typeof ValidThemes>;

export const UserPreferencesSchema = z.object({
  theme: ValidThemes,
});

export const UserPreferencesDTO = UserPreferencesSchema.partial();
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export type Toast = {
  type: "success" | "error";
  message: string;
};

export const RegisterUserDTO = z.object({
  name: z.string(),
  password: z.string().min(5),
});
