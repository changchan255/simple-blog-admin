'use server';

import { deletePost } from "@/lib/posts";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLocale } from "next-intl/server";

export async function deletePostAction(formData: FormData) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/login`);
  }

  const id = formData.get("id") as string;

  await deletePost(id);

  redirect(`/${locale}/posts`);
}
