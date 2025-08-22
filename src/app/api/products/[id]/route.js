// pages/api/products/[id].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    if (req.method === "GET") {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
