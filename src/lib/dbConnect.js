import { MongoClient } from "mongodb";

const uri = process.env.DB_URL; // from .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.DB_URL) {
  throw new Error("❌ Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in dev to prevent multiple instances
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  const client = await clientPromise;
  const db = client.db("yMart"); 
  return db.collection(collectionName);
}
