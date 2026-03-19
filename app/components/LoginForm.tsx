'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

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
      router.push("/posts");
      router.refresh();
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow rounded space-y-4"
      >
        <h1 className="text-xl font-bold text-blue-600">
          Login
        </h1>

        <input
          className="border p-2 w-full"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full cursor-pointer rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
