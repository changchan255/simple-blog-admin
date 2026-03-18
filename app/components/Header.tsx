'use client';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-blue-600">
        Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          Hello, Admin
        </span>

        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}
