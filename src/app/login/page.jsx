
"use client";
import SocialLogin from "@/components/SocialLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const router=useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
 
    });

    if (!res?.ok) {
      setError("Invalid email or password");
    } else {
      router.push("/products")
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>

      
        <SocialLogin />

      
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

      <form onSubmit={handleSubmit} className=" text-black space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-lg"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-3 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        Login
      </button>
    </form>
        
      </div>
    </div>
  );
}
