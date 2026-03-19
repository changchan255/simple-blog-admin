'use client';
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-blue-600">
        Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
          <span className="text-gray-600 text-sm">
            Hello, {session.user.name}
          </span>
          <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </>
          )}
      </div>
    </header>
  );
}
