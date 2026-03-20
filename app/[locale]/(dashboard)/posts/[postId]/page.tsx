import { getPost } from "@/lib/posts";
import type { Metadata } from "next";
import PostDetail from "@/app/components/PostDetail";

type Props = {
  params: { postId: string } | Promise<{ postId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const post = await getPost(postId);

  return {
    title: post?.title ?? "Post Not Found",
    description: post?.content?.slice(0, 150) ?? "No description available",
  };
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;

  return <PostDetail postId={postId} />;
}
