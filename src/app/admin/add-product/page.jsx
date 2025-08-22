"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    price: "",
    oldPrice: "",
    discount: "",
    ratings: "",
    stock: "",
    image: "",
    sizes: "",
    colors: "",
    description: "",
    sku: "",
    timeLeft: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    const payload = {
      ...form,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      ratings: Number(form.ratings),
    };

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");

      alert("Product added successfully!");
      router.push("/products"); 
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Product Title" value={form.title} onChange={handleChange} className="input" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="input" />
        <input name="oldPrice" type="number" placeholder="Old Price / MRP" value={form.oldPrice} onChange={handleChange} className="input" />
        <input name="discount" placeholder="Discount (e.g. 50%)" value={form.discount} onChange={handleChange} className="input" />
        <input name="ratings" type="number" placeholder="Ratings" value={form.ratings} onChange={handleChange} className="input" />
        <input name="stock" placeholder="Stock (IN STOCK / OUT OF STOCK)" value={form.stock} onChange={handleChange} className="input" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="input" />
        <input name="sizes" placeholder="Sizes (comma-separated)" value={form.sizes} onChange={handleChange} className="input" />
        <input name="colors" placeholder="Colors (comma-separated hex or names)" value={form.colors} onChange={handleChange} className="input" />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} className="input" />
        <input name="timeLeft" placeholder="Time Left (e.g. 30 Days)" value={form.timeLeft} onChange={handleChange} className="input" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="textarea" rows={4} />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
