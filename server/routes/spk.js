import express from "express";
import db from "../conn.js";
import { getSpk } from "../lib.js";

const router = express.Router();

// Get all SPKs
router.get("/", async (req, res) => {
  let collection = await db.collection("SPKs");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get SPK by ID
router.get("/:spkId", async (req, res) => {
  const result = await getSpk(req.params.spkId);
  if (result) {
    res.send(result).status(200);
  } else {
    res.send("SPK not found").status(404);
  }
});

export default router;