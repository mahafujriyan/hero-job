"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="space-y-3">
      {/* Google Login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className=" text-black w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
      >
        <FcGoogle className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>

      {/* GitHub Login (optional) */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
      >
        <FaGithub className="w-5 h-5" />
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
}
