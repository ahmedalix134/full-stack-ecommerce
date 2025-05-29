"use server";
// This file is for the profile page of the application.
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET_KEY;

if (!secretKey) {
  throw new Error("SESSION_SECRET_KEY environment variable is not set");
}
const encodedKey = new TextEncoder().encode(secretKey);
//  create json webtoken
export async function encrypt(payload: JWTPayload | undefined) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodedKey);
}

export async function decrypt(session: string | Uint8Array<ArrayBufferLike>) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error decrypting session:", error);
    throw new Error("Invalid session");
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
