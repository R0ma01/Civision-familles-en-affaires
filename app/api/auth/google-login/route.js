// app/api/auth/googleSignIn.js
"use server";

import { signIn, auth } from "@/auth";

export async function googleSignIn() {
  await signIn("google");
  const session = await auth();
  return session;
}
