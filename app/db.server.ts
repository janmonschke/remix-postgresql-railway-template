import { PrismaClient } from "@prisma/client";
import { remember } from "@epic-web/remember";

export const db = remember("prisma", () => new PrismaClient());
