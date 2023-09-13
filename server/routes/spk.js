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
  let spks = await db.collection("SPKs");
  let query = {spkId: req.params.spkId};
  let result = await spks.findOne(query);

  if (!result) {
    res.send("SPK not found").status(404);
  } else {
    
    // Find and add SPKs to SPK
    let spkSpk = await db.collection("SPK-SPK");
    let spksObject = await spkSpk.find(query).toArray();
    if (spksObject.length) {
      let spkIds = [];
      spksObject.forEach((spk) => {
        spkIds.push(spk.spkId);
      });
      result.spkIds = spkIds;
    }
    
    // Find and add Subjects to SPK
    let spkSubject = await db.collection("SPK-Subject");
    let subjectsObject = await spkSubject.find(query).toArray();
    if (subjectsObject.length) {
      let subjectIds = [];
      subjectsObject.forEach((subject) => {
        subjectIds.push(subject.subjectId);
      });
      result.subjectIds = subjectIds;
    }
    
    res.send(result).status(200);
  }
});

export default router;