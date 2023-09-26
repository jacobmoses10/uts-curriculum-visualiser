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
    let couseSpkResult = await courseSpkDb.find(query).toArray();
    
    if (couseSpkResult.length) {
      let spkArray = [];
      let spkDb = await db.collection("SPKs");
      
      couseSpkResult.forEach(async (courseSpk) => {
        let spkQuery = {spkId: courseSpk.spkId};
        let spkResult = await spkDb.findOne(spkQuery);
        spkArray.push(spkResult);
      });
      
      result.spks = spkArray;
    }
    
    // Find and add Subjects to Course
    let courseSubjectDb = await db.collection("Course-Subject");
    let courseSubjectResult = await courseSubjectDb.find(query).toArray();
    
    if (courseSubjectResult.length) {
      let subjectArray = [];
      let subjectDb = await db.collection("Subjects");

      courseSubjectResult.forEach(async (courseSubject) => {
        let subjectQuery = {spkId: courseSubject.spkId};
        let subjectResult = await subjectDb.findOne(subjectQuery);
        subjectArray.push(subjectResult);
      });
      result.subjects = subjectArray;
    }
    
    res.send(result).status(200);
  }
});

export default router;