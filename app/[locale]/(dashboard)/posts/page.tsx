import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPosts } from "@/lib/posts";
import { redirect } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { getTranslations, getLocale } from "next-intl/server";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Posts");
  const locale = await getLocale();

  if (!session) {
    redirect(`/${locale}/login`);
  }

  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        {t("all")}
      </h1>

      <div className="grid gap-4">
        {posts.map((p: any) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
