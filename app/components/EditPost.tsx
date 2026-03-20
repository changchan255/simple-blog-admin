'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, updatePostThunk } from '@/lib/features/postSlice';
import type { RootState, AppDispatch } from '@/lib/store';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function EditPost({ postId }: { postId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.post);
  const t = useTranslations("Posts");
  const router = useRouter();

  const post = posts.find((p: any) => String(p.id) === postId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content || '');
    }
  }, [post]);

  if (!post) {
    return <div>{t("notFound")}</div>;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(
        updatePostThunk({
          id: post.id,
          title,
          content,
        })
      ).unwrap();

      router.push('/posts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        {t("edit")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-32"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {t("update")}
        </button>
      </form>
    </div>
  );
}
