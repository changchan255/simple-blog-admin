async function getPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/posts`, {
  next: { revalidate: 10 }, 
});
  const posts = await res.json();
  return posts.find((p: any) => p.id === id);
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {post?.title}
      </h1>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-gray-700">
          This is the content of post #{postId}.
        </p>
      </div>
    </div>
  );
}
