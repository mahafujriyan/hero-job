/* eslint-disable @next/next/no-img-element */
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function getProduct(id) {
  if (!ObjectId.isValid(id)) {
    // invalid ID
    return null;
  }

  const db = client.db(process.env.DB_NAME);
  return db.collection("products").findOne({ _id: new ObjectId(id) });
}

export default async function ProductDetails({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">
        🚫 Product not found.
      </div>
    );
  }

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left - Images */}
      <div>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name || "Product"}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      {/* Right - Details */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-2">SKU#: {product.sku || "N/A"}</p>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-red-600">${product.price ?? 0}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through">${product.oldPrice}</span>
          )}
        </div>

        <p className="mt-4 text-gray-600">{product.description || "No description"}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Available Colors:</h3>
          <div className="flex gap-2">
            {product.colors?.map((c, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: c }}
              />
            )) || <span>No colors available</span>}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Available Sizes:</h3>
          <div className="flex gap-2">
            {product.sizes?.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100"
              >
                {s}
              </span>
            )) || <span>No sizes available</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
