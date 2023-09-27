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
    
    // Find and add Pre-Requisites to Subject
    let prereqDb = await db.collection("Prerequisites");
    let queryCol2 = {subjectId2: req.params.subjectId};
    let prereqResult = await prereqDb.find(queryCol2).toArray();
    
    if (prereqResult.length) {
      let prereqIdArray = [];
      prereqResult.forEach((prereq) => {
        prereqIdArray.push(prereq.subjectId);
      });
      
      let prereqQuery = {subjectId: {$in: prereqIdArray}};
      let prereqSubjectResult = await subjects.find(prereqQuery).toArray();
      result.prereqs = prereqSubjectResult;
    }

    // Find and add Post-Requisites to Subject
    let postreqResult = await prereqDb.find(query).toArray();
    
    if (postreqResult.length) {
      let postreqIdArray = [];
      postreqResult.forEach((postreq) => {
        postreqIdArray.push(postreq.subjectId2);
      });
      
      let postreqQuery = {subjectId: {$in: postreqIdArray}};
      let postreqSubjectResult = await subjects.find(postreqQuery).toArray();
      result.postreqs = postreqSubjectResult;
    }
    
    res.send(result).status(200);
  }
});

export default router;