import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen  gap-16 sm:p-20">
  <Hero></Hero>
  <ProductCard></ProductCard>
      
    </div>
  );
}
