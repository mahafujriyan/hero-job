import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCollection = await dbConnect("products");
    const items = await productsCollection.find({}).toArray();

    const formatted = items.map(p => ({
      _id: p._id.toString(),
      name: p.title,
      price: p.price,
      oldPrice: p.mrp,
      discount: p.discount,
      stock: p.stock,
      image: p.image || "/placeholder.png",
      sizes: p.sizes || [],
      colors: p.colors || [],
      description: p.description || "",
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
