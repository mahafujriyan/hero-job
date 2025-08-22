"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product._id} 
            className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Heart / Wishlist */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
              <FaHeart />
            </button>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-gray-400 text-xs mb-1">T-SHIRT</span>
              <span className="text-gray-500 text-xs mb-2">S M XL</span>
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>

              {/* Price */}
              <div className="flex items-center mb-2 gap-2">
                <span className="text-red-600 font-bold">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">${product.oldPrice}</span>
                )}
              </div>

              {/* Color options */}
              <div className="flex items-center gap-2 mt-auto">
                {product.colors?.map((color, i) => (
                  <span 
                    key={i} 
                    className={`w-4 h-4 rounded-full border border-gray-300`} 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <Link 
                href={`/products/${product._id}`} 
                className="mt-4 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
