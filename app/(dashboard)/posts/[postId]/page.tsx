import { getPost } from "@/lib/posts";
import type { Metadata } from "next";

type Props = {
  params: { postId: string } | Promise<{ postId: string }>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; 
  const post = await getPost(resolvedParams.postId);

  return {
    title: post?.title ?? "Post Not Found",
    description: post?.content?.slice(0, 150) ?? "No description available",
  };
}

export default async function PostDetail({ params }: Props) {
  const resolvedParams = await params; 
  const postId = resolvedParams.postId;

  console.log("Resolved params:", resolvedParams);

  const post = await getPost(postId);

  if (!post) {
    return <div className="p-6 text-red-500">Post not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.content.slice(0, 150),
    author: { "@type": "Person", name: "Admin" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title}</h1>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </>
  );
}
