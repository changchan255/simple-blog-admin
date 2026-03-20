import { getPost } from "@/lib/posts";
import { updatePostAction } from "./actions";
import { getTranslations } from "next-intl/server";

export default async function EditPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);
  const t = await getTranslations("Posts");

  if (!post) {
    return <div>{t("notFound")}</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        {t("edit")}
      </h1>

      <form action={updatePostAction} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input type="hidden" name="id" value={post.id} />

        <input
          name="title"
          defaultValue={post.title}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="content"
          defaultValue={post.content ?? ""}
          className="w-full border p-2 rounded h-32"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {t("update")}
        </button>
      </form>
    </div>
  );
}
