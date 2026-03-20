import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Greeting from "../components/Greeting";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('Home');
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${locale}/posts`);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">
          {t('welcome')}
        </h1>

        <Greeting />

        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/login`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('login')}
          </Link>

          <Link
            href={`/${locale}/register`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('register')}
          </Link>
        </div>
      </div>

      <Image
        src="/hero.png"
        alt="Hero"
        width={720}
        height={720}
        priority
      />
    </div>
  );
}
