

import clientPromise from "@/lib/mongodb";


export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    if (req.method === "GET") {
      const products = await db.collection("products").find({}).toArray();
      res.status(200).json(products);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
