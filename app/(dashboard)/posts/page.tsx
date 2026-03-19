import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPosts } from "@/lib/posts";
import { redirect } from "next/navigation";
import PostCard from "@/app/components/PostCard";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const posts = await getPosts();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        All Posts
      </h1>

      <div className="grid gap-4">
        {posts.map((p: any) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
