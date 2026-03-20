'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/lib/features/postSlice';
import type { RootState, AppDispatch } from '@/lib/store';
import PostCard from '@/app/components/PostCard';

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-4">
      {posts.map((p: any) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
