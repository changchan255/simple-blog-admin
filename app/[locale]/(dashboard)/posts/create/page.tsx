'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '@/lib/features/postSlice';
import type { AppDispatch } from '@/lib/store';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function CreatePostPage() {
  const { data: session } = useSession();
  const t = useTranslations("Posts");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await dispatch(
      createPostThunk({
        title,
        content,
        authorId: Number(session?.user.id),
      })
    );

    router.push('/posts');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        {t("add")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow border"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder={t("title")}
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-32"
          placeholder={t("content")}
          required
        />

        <button 
        disabled={!session}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {t("create")}
        </button>
      </form>
    </div>
  );
}
