import { registerAction } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/posts");
    }

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <form
        action={registerAction}
        className="bg-white p-6 rounded-xl shadow space-y-4 w-80"
      >
        <h1 className="text-xl font-bold text-blue-600">
          Register
        </h1>

        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          required
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded cursor-pointer hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
