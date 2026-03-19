import Link from "next/link";
import { deletePostAction } from "../(dashboard)/posts/actions";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition space-y-2">
      
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-lg font-semibold text-blue-600">
          #{post.id}: {post.title}
        </h2>
        <p className="text-gray-500 text-sm">
          Click to view details
        </p>
      </Link>

      <div className="flex items-center gap-3">
        <button
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        >
        <Link
          href={`/posts/${post.id}/edit`}
        >
          Edit
        </Link>
        </button>

        <form action={deletePostAction}>
          <input type="hidden" name="id" value={post.id} />
          <button
            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
