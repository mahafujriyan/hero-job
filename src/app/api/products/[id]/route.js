import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const productsCollection = await dbConnect("products");
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formatted = {
      _id: product._id.toString(),
      name: product.title,
      price: product.price,
      oldPrice: product.mrp,
      discount: product.discount,
      stock: product.stock,
      image: product.image || "/placeholder.png",
      sizes: product.sizes || [],
      colors: product.colors || [],
      description: product.description || "",
    };

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
