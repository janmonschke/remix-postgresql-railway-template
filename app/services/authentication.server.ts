import { createCookieSessionStorage } from "@remix-run/node";
import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { db } from "~/db.server";
import { comparePasswordAndHash } from "~/helpers/passwords";

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "authSession",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 100,
    httpOnly: true,
    secrets: [process.env.COOKIE_SECRET ?? "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<User>(authSessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const name = form.get("name");
    const password = form.get("password");

    if (!name || !password) {
      throw new Error("Both name and password are required");
    }

    const user = await db.user.findUnique({
      where: {
        name: name.toString(),
      },
    });

    if (!user) {
      throw new Error("Could not find user");
    }

    const isCorrectPassword = await comparePasswordAndHash(
      password.toString(),
      user.passwordHash
    );

    if (!isCorrectPassword) {
      throw new Error("Wrong password");
    }

    return user;
  }),
  "user-pass"
);
