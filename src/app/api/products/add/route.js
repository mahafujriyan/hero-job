import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const productsCollection = await dbConnect("products");
    const result = await productsCollection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("❌ API Error in /api/products/add:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
