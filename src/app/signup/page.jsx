"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import SocialLogin from "@/components/SocialLogin";


export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/", 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Create an Account</h2>


        <SocialLogin />

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* 🔹 Credentials signup */}
        <form className="space-y-3 text-black" onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            {loading ? "Signing up..." : "Sign Up "}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}
