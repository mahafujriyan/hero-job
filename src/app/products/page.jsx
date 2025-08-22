// app/products/page.jsx
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch products:", res.status, res.statusText);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);

  if (!products || products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        🚫 No products found.
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
