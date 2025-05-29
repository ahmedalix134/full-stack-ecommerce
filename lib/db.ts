import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("DB_URI environment variable is not set");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// This function connects to the MongoDB database and returns the database instance
const connectToDatabase = async (dbName: string) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
// This function retrieves a collection from the connected database

export const getCollection = async (collectionName: string) => {
  const db = await connectToDatabase("fashion");
  const collection = db.collection(collectionName);
  if (db) return collection;
  throw new Error("Database connection failed");
};
