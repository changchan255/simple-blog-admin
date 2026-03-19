'use server';

import { updatePost } from "@/lib/posts";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updatePostAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  if (!content) {
    throw new Error("Content is required");
  }

  await updatePost({ id, title, content });

  redirect("/posts");
}
