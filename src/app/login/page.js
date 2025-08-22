"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleLogin(e) {
    e.preventDefault();
    await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: true,
      callbackUrl: "/products",
    });
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "linear-gradient(135deg, #e7eff3, #d0dae7)" }}
    >
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <p className="text-red-600 text-center mb-4">
            Invalid email or password
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
