import express from "express";
import db from "../conn.js";

const router = express.Router();

// Get all SPKs
router.get("/", async (req, res) => {
  let collection = await db.collection("SPKs");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get SPK by ID
router.get("/:spkId", async (req, res) => {
  let spkDb = await db.collection("SPKs");
  let query = {spkId: req.params.spkId};
  let result = await spkDb.findOne(query);

  if (!result) {
    res.send("SPK not found").status(404);
  } else {
    
    // Find and add Spks to SPK
    let spkSpkDb = await db.collection("SPK-SPK");
    let spkSpkResult = await spkSpkDb.find(query).toArray();
    
    if (spkSpkResult.length) {
      let spkIdArray = [];
      spkSpkResult.forEach((spkSpk) => {
        spkIdArray.push(spkSpk.spkId2);
      });

      let spkQuery = {spkId: {$in: spkIdArray}};
      let spkResult = await spkDb.find(spkQuery).toArray();
      result.spks = spkResult;
    }
    
    // Find and add Subjects to SPK
    let spkSubjectDb = await db.collection("SPK-Subject");
    let spkSubjectResult = await spkSubjectDb.find(query).toArray();

    if (spkSubjectResult.length) {
      let subjectIdArray = [];
      spkSubjectResult.forEach((spkSubject) => {
        subjectIdArray.push(spkSubject.subjectId);
      });
      
      let subjectDb = await db.collection("Subjects");
      let subjectQuery = {subjectId: {$in: subjectIdArray}};
      let subjectResult = await subjectDb.find(subjectQuery).toArray();
      result.subjects = subjectResult;
    }

    res.send(result).status(200);
  }
});

export default router;