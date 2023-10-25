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

// Get SPK Tree
router.get("/tree/:spkId", async (req, res) => {
  const result = await getSpk(req.params.spkId);
  if (result) {
    let tree = {
      name: result.spkId,
      type: 'spk',
      children: []
    };

    // Add Spks to Tree
    if (result.spks) {
      for (const spk of result.spks) {
        let spkData = await getSpk(spk.spkId);
        let spkChildren = [];

        // Add Spk Spks
        if (spkData.spks) {
          spkData.spks.forEach((childSpk) => {
            spkChildren.push({
              name: childSpk.spkId,
              type: 'spk'
            });
          });
        }

        // Add Spk Subjects
        if (spkData.subjects) {
          spkData.subjects.forEach((childSubject) => {
            spkChildren.push({
              name: childSubject.subjectId,
              type: 'subject'
            });
          });
        }
        
        tree.children.push({
          name: spkData.spkId,
          type: 'spk',
          children: spkChildren
        });
      }
    }

    // Add Subjects to Tree
    if (result.subjects) {
      result.subjects.forEach((subject) => {
        tree.children.push({
          name: subject.subjectId,
          type: 'subject'
        });
      });
    }

    res.send(tree).status(200);   
  } else {
    res.send("SPK not found").status(404);
  }  
});

export default router;