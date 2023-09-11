import { MongoClient } from "mongodb";
import "./env.js";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Data");

export default db;