'use client';

import Link from "next/link";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "@/lib/features/postSlice";
import type { AppDispatch } from "@/lib/store";
import { useTranslations } from "next-intl";

export default function PostCard({ post }: { post: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('Post');

  const handleDelete = () => {
    dispatch(deletePostThunk(post.id));
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-lg font-semibold text-blue-600">
          #{post.id}: {post.title}
        </h2>
        <p className="text-gray-500 text-sm">
          {t('view')}
        </p>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href={`/posts/${post.id}/edit`}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        >
          {t('edit')}
        </Link>
        
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
        >
          {t('delete')}
        </button>
      </div>
    </div>
  );
}
