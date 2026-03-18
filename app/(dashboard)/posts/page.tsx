import PostCard from "@/app/components/PostCard";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
  next: { revalidate: 10 }, 
});
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        All Posts
      </h1>

      <div className="grid gap-4">
        {posts.map((p: any) => (
          <PostCard key={p.id} id={p.id} />
        ))}
      </div>
    </div>
  );
}
