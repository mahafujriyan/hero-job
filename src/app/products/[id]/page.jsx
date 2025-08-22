"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.image || "/placeholder.png");
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left - Images */}
      <div>
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-lg mb-4"
        />
        <div className="flex gap-2">
          {product.sizes?.map((img, idx) => (
            <img
              key={idx}
              src={img || "/placeholder.png"}
              alt={`Thumb ${idx}`}
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right - Product Info */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-2">
          {/* Ratings placeholder */}
          <span className="text-yellow-400 mr-2">★ ★ ★ ★ ☆</span>
          <span className="text-gray-500 text-sm">{product.ratings} Ratings</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-red-600">৳{product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">৳{product.oldPrice}</span>
          )}
          {product.discount && <span className="text-green-600">-{product.discount}</span>}
        </div>

        <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
        <p className={`mb-2 font-semibold ${product.stock === "OUT OF STOCK" ? "text-red-500" : "text-blue-600"}`}>
          {product.stock}
        </p>

        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sizes:</h3>
            <div className="flex gap-2">
              {product.sizes.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Colors:</h3>
            <div className="flex gap-2">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-6 h-6 rounded-full border cursor-pointer"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}

        <button className="btn btn-primary mt-auto">Add to Cart</button>
      </div>
    </div>
  );
}
