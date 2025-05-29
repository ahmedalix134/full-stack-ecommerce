"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getAuthUser() {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("session")?.value;
  if (session) {
    try {
      const user = await decrypt(session);
      return user;
    } catch (error) {
      console.error("Error decrypting session:", error);
      return null;
    }
  }
}
