import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCollection = await dbConnect("products");
    const products = await productsCollection.find({}).toArray();

    const formatted = products.map((p) => ({
      _id: p._id.toString(),
      name: p.title || p.name || "Unnamed Product",
      price: p.price ?? 0,
      oldPrice: p.oldPrice ?? null,
      discount: p.discount ?? null,
      ratings: p.ratings ?? 0,
      stock: p.stock ?? "AVAILABLE",
      image: p.image || "/placeholder.png",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ API Error in /api/products:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
