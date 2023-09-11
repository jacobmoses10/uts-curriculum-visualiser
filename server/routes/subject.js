import express from "express";
import db from "../conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("Subjects");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

export default router;