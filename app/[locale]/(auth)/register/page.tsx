import { registerAction } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Auth");
  const locale = await getLocale();

  if (session) {
    redirect(`/${locale}/posts`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-8">
      <form
        action={registerAction}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow space-y-5"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 text-center">
          {t("register")}
        </h1>

        <div className="space-y-4">
          <input
            name="username"
            placeholder={t("username")}
            className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder={t("password")}
            className="w-full border p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition">
          {t("register")}
        </button>
      </form>
    </div>
  );
}
