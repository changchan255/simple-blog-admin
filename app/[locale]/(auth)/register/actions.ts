'use server';

import { createUser } from "@/lib/users";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export async function registerAction(formData: FormData) {
  const locale = await getLocale();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    throw new Error("Missing fields");
  }

  await createUser({ username, password });

  redirect(`/${locale}/login`);
}
