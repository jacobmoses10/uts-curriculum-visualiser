import express from "express";
import db from "../conn.js";

const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  let courses = await db.collection("Courses");
  let results = await courses.find({}).toArray();
  res.send(results).status(200);
});

// Get Course by ID
router.get("/:courseId", async (req, res) => {
  let courseDb = await db.collection("Courses");
  let courseQuery = {courseId: req.params.courseId};
  let result = await courseDb.findOne(courseQuery);

  if (!result) {
    res.send("Course not found").status(404);
  } else {
    
    // Find and add Spks to Course
    let courseSpkDb = await db.collection("Course-SPK");
    let couseSpkResult = await courseSpkDb.find(courseQuery).toArray();
    
    if (couseSpkResult.length) {
      let spkIdArray = [];
      couseSpkResult.forEach((courseSpk) => {
        spkIdArray.push(courseSpk.spkId);
      });
      
      let spkDb = await db.collection("SPKs");
      let spkQuery = {spkId: {$in: spkIdArray}};
      let spkResult = await spkDb.find(spkQuery).toArray();
      result.spks = spkResult;
    }
    
    // Find and add Subjects to Course
    let courseSubjectDb = await db.collection("Course-Subject");
    let courseSubjectResult = await courseSubjectDb.find(courseQuery).toArray();
    
    if (courseSubjectResult.length) {
      let subjectIdArray = [];
      courseSubjectResult.forEach((courseSubject) => {
        subjectIdArray.push(courseSubject.subjectId);
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