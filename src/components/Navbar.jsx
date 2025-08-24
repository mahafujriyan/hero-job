"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-300 via-blue-500 to-green-300 text-white shadow-md z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
        <img className="w-20 h-15" src="/asscet/ymart (1).png" alt=""  />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-lg font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/contact">Contact</Link></li>

          {session && (
            <li>
              <Link
                href="/dashboard"
                className="bg-white text-red-700 px-3 py-1 rounded-full hover:bg-red-200"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

 
        <div className="hidden lg:flex gap-3">
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full px-4"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => signIn("credentials", { callbackUrl: "/products" })}
                className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full px-4"
              >
                Login
              </button>
              <Link
                href="/signup"
                className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full px-4"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-red-800 px-6 py-4 flex flex-col gap-2">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          {session && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="bg-white text-red-700 px-3 py-1 rounded-full hover:bg-red-200"
            >
              Dashboard
            </Link>
          )}

          {session ? (
            <button
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
              className="block btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full w-full"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => { setOpen(false); signIn("credentials", { callbackUrl: "/products" }); }}
                className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full w-full"
              >
                Login
              </button>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full w-full text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
