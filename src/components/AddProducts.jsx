"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    mrp: "",
    discount: "",
    sku: "",
    stock: "",
    description: "",
    image: ""
  });

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not authenticated</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save product (API call example)
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    console.log("Product submitted:", product);
    router.push("/products");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-black shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input type="number" name="mrp" value={product.mrp} onChange={handleChange} placeholder="MRP" className="border p-2 rounded" />
        <input type="text" name="discount" value={product.discount} onChange={handleChange} placeholder="Discount" className="border p-2 rounded" />
        <input type="text" name="sku" value={product.sku} onChange={handleChange} placeholder="SKU" className="border p-2 rounded" />
        <input type="text" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
}
