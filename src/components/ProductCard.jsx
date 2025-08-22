"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link
      href={`/products/${product._id}`}
      aria-label={`View details for ${product.name}`}
      className="block border rounded-xl p-4 shadow-md hover:shadow-lg transition"
    >
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>

      {product.oldPrice && (
        <p className="text-gray-500 line-through">₹{product.oldPrice}</p>
      )}

      <p className="text-red-600 font-bold">₹{product.price}</p>

      {product.stock === "OUT OF STOCK" && (
        <p className="text-red-500 font-semibold mt-1">Out of stock</p>
      )}
    </Link>
  );
}
