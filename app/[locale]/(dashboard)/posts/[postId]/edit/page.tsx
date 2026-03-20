import EditPost from "@/app/components/EditPost";

export default async function EditPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <EditPost postId={postId} />;
}
