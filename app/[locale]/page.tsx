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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-10 gap-10">
      
      <div className="flex flex-col items-center md:items-start justify-center gap-6 text-center md:text-left max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold">
          {t('welcome')}
        </h1>

        <Greeting />

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href={`/${locale}/login`}
            className="w-full sm:w-auto text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('login')}
          </Link>

          <Link
            href={`/${locale}/register`}
            className="w-full sm:w-auto text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('register')}
          </Link>
        </div>
      </div>

      <div className="w-full max-w-sm md:max-w-lg">
        <Image
          src="/hero.png"
          alt="Hero"
          width={720}
          height={720}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
