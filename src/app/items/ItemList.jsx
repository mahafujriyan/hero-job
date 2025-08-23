"use client";
import { useEffect, useState } from "react";

export default function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
<div>
    <h1 className="text-2xl font-bold text-center px-3">  Trading Products</h1>
     <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl transition"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover rounded-xl"
            />
            <span className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              TRENDING
            </span>
          </div>

          {/* Info */}
          <div className="mt-4 flex flex-col flex-1">
            <h3 className="text-sm text-gray-500 uppercase">{item.sku}</h3>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-red-600">₹{item.price}</span>
              <span className="text-gray-400 line-through">₹{item.mrp}</span>
              <span className="text-green-600 text-sm font-medium">
                {item.discount} OFF
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-2">{item.stock}</p>

            {/* Sizes */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {item.sizes?.map((size, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 border text-xs rounded-lg text-gray-600"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
</div>
   
  );
}
