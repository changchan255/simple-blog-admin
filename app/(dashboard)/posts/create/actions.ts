'use server';

import { createPost } from '@/lib/posts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createPostAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title) {
    throw new Error("Title is required");
  }

  if (!content) {
    throw new Error("Content is required");
  }

  await createPost({ title, content, authorId: Number(session.user.id), });

  redirect('/posts');
}
