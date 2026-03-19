import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Greeting from "./components/Greeting";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/posts");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Welcome to Blog Admin!</h1>
        <Greeting />
        <div className="flex items-center justify-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <Link href="/login">Login</Link>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
      <Image
          src="/hero.png"
          alt="Next.js Logo"
          width={720}
          height={720}
          priority
        />
    </div>
  );
}
