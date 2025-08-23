import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      provider: "credentials",
    });

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
   
  }
}
