import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPosts } from "@/lib/posts";
import { redirect } from "next/navigation";
import PostList from "@/app/components/PostList";
import { getTranslations, getLocale } from "next-intl/server";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Posts");
  const locale = await getLocale();

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        {t("all")}
      </h1>

      <PostList/>
    </div>
  );
}
