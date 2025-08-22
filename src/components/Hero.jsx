"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "44% Off",
    badgeColor: "badge-warning",
    title: <>Fashion sale for <span className="text-primary">Men&apos;s</span></>,
    desc: "Wear the change. Fashion that feels good.",
    btn: { text: "Shop Now", color: "btn-primary" },
    img: "/asscet/31.jpg",
    border: "border-yellow-400"
  },
  {
    id: 2,
    badge: "New Arrival",
    badgeColor: "badge-primary",
    title: <>Trendy <span className="text-secondary">Summer Wear</span></>,
    desc: "Stay cool & stylish all season long.",
    btn: { text: "Explore Now", color: "btn-secondary" },
    img: "/asscet/1.jpg",
    border: "border-blue-400"
  },
  {
    id: 3,
    badge: "Limited Offer",
    badgeColor: "badge-accent",
    title: <>Best <span className="text-accent">Winter Collection</span></>,
    desc: "Cozy, comfy & affordable winter wear.",
    btn: { text: "Grab Now", color: "btn-accent" },
    img: "/asscet/cls-circle2.jpg",
    border: "border-pink-400"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);


  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); 
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
     
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 bg-black"
          >
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 w-full px-6 lg:px-16 py-12">
          
              <div className="space-y-6 max-w-xl text-center lg:text-left">
                <div className={`badge ${slide.badgeColor} p-4 text-lg font-bold rounded-full shadow-md`}>
                  {slide.badge}
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-500">{slide.desc}</p>
                <Link href="/shop">
                  <button className={`btn ${slide.btn.color} rounded-full px-6 text-lg mt-4`}>
                    {slide.btn.text}
                  </button>
                </Link>
              </div>

              {/* Right Image */}
              <div className="relative w-full max-w-sm flex justify-center">
                <div className={`rounded-full border-8 ${slide.border} p-2 shadow-xl`}>
                  <img
                    src={slide.img}
                    alt={slide.badge}
                    width={400}
                    height={400}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute flex justify-center gap-2 w-full bottom-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full ${idx === current ? "bg-primary" : "bg-gray-400"}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
