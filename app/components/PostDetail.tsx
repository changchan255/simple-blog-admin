'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/lib/features/postSlice';
import type { RootState, AppDispatch } from '@/lib/store';
import { useTranslations } from 'next-intl';

export default function PostDetail({ postId }: { postId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  const t = useTranslations("Posts");

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const post = posts.find((p: any) => String(p.id) === postId);

  if (loading) return <p>Loading...</p>;

  if (!post) {
    return <div className="p-6 text-red-500">{t("notFound")}</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {post.title}
      </h1>
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
}
