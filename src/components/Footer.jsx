"use client"; 

import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
     <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    
        <div>
          <div className="flex items-center mb-4">
           
            <h2 className="text-2xl font-bold text-red-500">Travel Guru</h2>
          </div>
          <p className="text-gray-400">
            Explore the world with us. We make every journey memorable and
            hassle-free. Discover new destinations, unique experiences, and
            unforgettable memories.
          </p>
        </div>

      
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-red-400 transition">Home</a>
            </li>
            <li>
              <a href="/tours" className="hover:text-red-400 transition">Tours</a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-400 transition">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-400 transition">Contact</a>
            </li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">Contact Us</h2>
          <p>Email: hossainmdmahafuj17@gmail.com</p>
          <p>Phone: +880 01889359904</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

   
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/1JJHToMdZz/" className="hover:text-red-400 transition"><FaFacebookF /></a>
            <a href="https://x.com/Mhriyan87" className="hover:text-red-400 transition"><FaTwitter /></a>
            <a href="https://www.instagram.com/mahafujhr?igsh=Y2p1MmQ1b21tMjNm" className="hover:text-red-400 transition"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/mahafujriyan87/" className="hover:text-red-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
  );
}