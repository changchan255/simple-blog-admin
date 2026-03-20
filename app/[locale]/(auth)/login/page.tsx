import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/app/components/LoginForm";
import { getLocale } from "next-intl/server";

export default async function LoginPage() {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${locale}/posts`);
  }

  return <LoginForm />;
}
