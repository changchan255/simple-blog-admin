'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const locale = pathname.split('/')[1];

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="w-56 h-screen bg-white border-r shadow-sm p-4">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        {t('title')}
      </h2>

      <nav className="space-y-2">
        <Link href={`/${locale}/posts`} className={linkClass(`/${locale}/posts`)}>
          {t('allPosts')}
        </Link>
        <Link href={`/${locale}/posts/create`} className={linkClass(`/${locale}/posts/create`)}>
          {t('addPost')}
        </Link>
      </nav>
    </div>
  );
}
