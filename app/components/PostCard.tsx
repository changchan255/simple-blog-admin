import Link from "next/link";

export default function PostCard({ id }: { id: string }) {
  return (
    <Link
      href={`/posts/${id}`}
      className="block p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold text-blue-600">
        Post #{id}
      </h2>
      <p className="text-gray-500 text-sm">
        Click to view details
      </p>
    </Link>
  );
}
