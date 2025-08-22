import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCollection = await dbConnect("products"); 
    const products = await productsCollection.find({}).toArray();

    const formatted = products.map((p) => ({
      _id: p._id.toString(),
      name: p.name || p.title || "Unnamed Product",
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

export async function POST(request) {
  try {
    const data = await request.json();
    const productsCollection = await dbConnect("products");

    const newProduct = {
      name: data.name || "Unnamed Product",
      price: data.price ?? 0,
      oldPrice: data.oldPrice ?? null,
      discount: data.discount ?? null,
      ratings: data.ratings ?? 0,
      stock: data.stock || "AVAILABLE",
      image: data.image || "/placeholder.png",
      description: data.description || "",
      sizes: data.sizes || [],
      colors: data.colors || [],
      createdAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/products error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
