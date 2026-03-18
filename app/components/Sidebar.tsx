'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="w-56 h-screen bg-white border-r shadow-sm p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        Blog Admin
      </h2>

      <nav className="space-y-2">
        <Link href="/posts" className={linkClass("/posts")}>
          All Posts
        </Link>
        <Link href="/posts/new" className={linkClass("/posts/new")}>
          Add Post
        </Link>
      </nav>
    </div>
  );
}
