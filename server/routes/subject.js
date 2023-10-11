import express from "express";
import db from "../conn.js";
import { getSubject } from "../lib.js";

const router = express.Router();

// Get all Subjects
router.get("/", async (req, res) => {
  let collection = await db.collection("Subjects");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get Subject by ID
router.get("/:subjectId", async (req, res) => {
  let result = await getSubject(req.params.subjectId);

  if (result) {
    res.send(result).status(200);
  } else {
    res.send("Subject not found").status(404);    
  }
});

export default router;