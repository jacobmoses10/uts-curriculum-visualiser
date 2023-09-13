import express from "express";
import db from "../conn.js";

const router = express.Router();

// Get all Subjects
router.get("/", async (req, res) => {
  let collection = await db.collection("Subjects");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get Subject by ID
router.get("/:subjectId", async (req, res) => {
  let subjects = await db.collection("Subjects");
  let query = {subjectId: req.params.subjectId};
  let result = await subjects.findOne(query);

  if (!result) {
    res.send("Subject not found").status(404);
  } else {
    
    // Find and add Prerequisites to Subject
    let prereqs = await db.collection("Prerequisites");
    let prereqObject = await prereqs.find(query).toArray();
    if (prereqObject.length) {
      let prereqIds = [];
      prereqObject.forEach((prereq) => {
        prereqIds.push(prereq.subjectId2);
      });
      result.prereqIds = prereqIds;
    }
    
    res.send(result).status(200);
  }
});

export default router;