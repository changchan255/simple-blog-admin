'use server';

import { createUser } from "@/lib/users";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Missing fields");
  }

  await createUser({ username, password });

  redirect("/login");
}
