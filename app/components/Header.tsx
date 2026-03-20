'use client';

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const t = useTranslations('Header');
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1];

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-blue-600">
        {t('dashboard')}
      </h1>

      <div className="flex items-center gap-4">
        {/* Switch locale */}
        <Link href={switchLocale('vi')}>VI</Link>
        <Link href={switchLocale('en')}>EN</Link>

        {session?.user && (
          <>
            <span className="text-gray-600 text-sm">
              {t('hello', { name: session.user.name || "you" })}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: `/${currentLocale}/login` })}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              {t('logout')}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
