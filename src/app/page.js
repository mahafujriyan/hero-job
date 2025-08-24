import Hero from "@/components/Hero";

import Image from "next/image";
import ItemsList from "./items/ItemList";
import Products from "./products/page";

export default function Home() {
  return (
    <div className="font-sans min-h-screen  gap-16 sm:p-20">
  <Hero></Hero>

  <Products></Products>
    </div>
  );
}
