'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Auth');

  const locale = pathname.split('/')[1];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push(`/${locale}/posts`);
      router.refresh();
    } else {
      alert(t('loginFailed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-blue-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow space-y-5"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 text-center">
          {t('login')}
        </h1>

        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition"
        >
          {t('login')}
        </button>

        <p className="text-center text-sm text-gray-600">
          {t('noAccount')}{" "}
          <Link
            href={`/${locale}/register`}
            className="text-blue-600 hover:underline"
          >
            {t('register')}
          </Link>
        </p>
      </form>
    </div>
  );
}
