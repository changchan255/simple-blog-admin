import { getPost } from "@/lib/posts";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default async function PostDetail({ params }: Props) {
  const { postId } = await params;
  const post = await getPost(postId);
  const t = await getTranslations("Posts");

  if (!post) {
    return <div className="p-6 text-red-500">{t("notFound")}</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title}</h1>
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
}
