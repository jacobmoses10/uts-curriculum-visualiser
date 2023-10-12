import express from "express";
import db from "../conn.js";
import { getCourse, getSpk } from "../lib.js";

const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  let courses = await db.collection("Courses");
  let results = await courses.find({}).toArray();
  res.send(results).status(200);
});

// Get Course by ID Route
router.get("/:courseId", async (req, res) => {
  const result = await getCourse(req.params.courseId);
  if (result) {
    res.send(result).status(200);   
  } else {
    res.send("Course not found").status(404);
  }
});

// Get Course Tree
router.get("/tree/:courseId", async (req, res) => {
  const result = await getCourse(req.params.courseId);
  if (result) {
    let tree = {
      id: result.courseId,
      name: result.abbTitle,
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
              id: childSpk.spkId,
              name: childSpk.abbTitle,
              link: `/spk/${childSpk.spkId}`
            });
          });
        }

        // Add Spk Subjects
        if (spkData.subjects) {
          spkData.subjects.forEach((childSubject) => {
            spkChildren.push({
              id: childSubject.subjectId,
              name: childSubject.abbTitle,
              link: `/subject/${childSubject.subjectId}`
            });
          });
        }
        
        tree.children.push({
          id: spkData.spkId,
          name: spkData.abbTitle,
          link: `/spk/${spkData.spkId}`,
          children: spkChildren
        });
      }
    }

    // Add Subjects to Tree
    if (result.subjects) {
      result.subjects.forEach((subject) => {
        tree.children.push({
          id: subject.subjectId,
          name: subject.abbTitle,
          link: `/subject/${subject.subjectId}`
        });
      });
    }

    res.send(tree).status(200);   
  } else {
    res.send("Course not found").status(404);
  }  
});

export default router;