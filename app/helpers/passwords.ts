import bcrypt from "bcryptjs";

export async function generatePasswordHash(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswordAndHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
