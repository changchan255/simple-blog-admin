import { getPost } from "@/lib/posts";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = await getPost(postId);

  if (!post) {
    return <div className="p-6">Post not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {post.title}
      </h1>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <p className="text-gray-700 leading-relaxed">
          {post.content}
        </p>
      </div>
    </div>
  );
}
