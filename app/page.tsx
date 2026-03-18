import Greeting from "./components/Greeting";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Welcome to Blog Admin!</h1>
        <Greeting />
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
