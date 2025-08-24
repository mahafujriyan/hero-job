

// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// export const runtime = "nodejs";

// export async function GET() {
//   try {
//     const client = await clientPromise;

//         const db = client.db(process.env.DB_NAME); 
//     const products = await db.collection("products").find({}).toArray();

//     return Response.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     return Response.json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// }



// export async function POST(req) {
//   try {
//     const data = await req.json();

  
//     if (!data.title || !data.price) {
//       return NextResponse.json(
//         { error: "Title and price are required" },
//         { status: 400 }
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db(process.env.DB_NAME);
//     const products = db.collection("products");

//     // Insert product
//     const result = await products.insertOne({
//       ...data,
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       { message: "Product added successfully", productId: result.insertedId.toString() },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return NextResponse.json(
//       { error: "Failed to add product" },
//       { status: 500 }
//     );
//   }
// }
// app/api/products/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.title || !data.price) {
      return NextResponse.json({ error: "Title and price are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const products = db.collection("products");

    const result = await products.insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Product added successfully", productId: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("Error adding product:", err);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
