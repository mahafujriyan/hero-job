"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddProductForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    discount: "",
    ratings: "",
    stock: "",
    image: "",
    description: "",
    sizes: "",
    colors: "",
  });

  if (!session) {
    return (
      <div className="p-4 text-center text-gray-600">
        🚫 You must be logged in to add products.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sizes: formData.sizes.split(",").map((s) => s.trim()),
          colors: formData.colors.split(",").map((c) => c.trim()),
        }),
      });

      if (res.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          price: "",
          oldPrice: "",
          discount: "",
          ratings: "",
          stock: "",
          image: "",
          description: "",
          sizes: "",
          colors: "",
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 text-black border border-b-black rounded-lg shadow-md space-y-4 max-w-lg mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="input w-full"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="input w-full"
        required
      />
      <input
        name="oldPrice"
        type="number"
        value={formData.oldPrice}
        onChange={handleChange}
        placeholder="Old Price"
        className="input w-full"
      />
      <input
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        placeholder="Discount"
        className="input w-full"
      />
      <input
        name="ratings"
        type="number"
        value={formData.ratings}
        onChange={handleChange}
        placeholder="Ratings"
        className="input w-full"
      />
      <input
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock (IN STOCK / OUT OF STOCK)"
        className="input w-full"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="input w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="input w-full"
      ></textarea>
      <input
        name="sizes"
        value={formData.sizes}
        onChange={handleChange}
        placeholder="Sizes (comma separated)"
        className="input w-full"
      />
      <input
        name="colors"
        value={formData.colors}
        onChange={handleChange}
        placeholder="Colors (comma separated)"
        className="input w-full"
      />

      <button type="submit" className="btn btn-primary w-full">
        Add Product
      </button>
    </form>
  );
}
