'use server';

import { deletePost } from "@/lib/posts";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function deletePostAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const id = formData.get("id") as string;

  await deletePost(id);

  redirect("/posts");
}
