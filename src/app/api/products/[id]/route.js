import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const products = db.collection("products");

    const product = await products.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
