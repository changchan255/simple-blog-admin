'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

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
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded space-y-4">
        <h1 className="text-xl font-bold text-blue-600">
          {t('login')}
        </h1>

        <input
          className="border p-2 w-full"
          placeholder={t('username')}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder={t('password')}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700">
          {t('login')}
        </button>
      </form>
    </div>
  );
}
