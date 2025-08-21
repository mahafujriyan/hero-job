"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-300 via-blue-500 to-green-300 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link href="/" className="flex items-center">
          <img
            src="/asscets/logo-1 (2).png"
            alt="Logo"
            className="h-15 w-auto"
          />
        </Link>

      
        <ul className="hidden lg:flex space-x-6 text-lg font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#">Tours</Link></li>
          <li><Link href="#">About Us</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full px-4"
          >
            Get Started
          </Link>
        </div>

        
        <button
          className="lg:hidden text-2xl p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-red-800 px-6 py-4 space-y-3 flex flex-col gap-2">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/tour" onClick={() => setOpen(false)}>Tours</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/Contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block btn btn-sm bg-white text-red-700 hover:bg-red-200 border-none rounded-full w-full"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}