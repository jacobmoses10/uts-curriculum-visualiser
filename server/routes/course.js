import express from "express";
import db from "../conn.js";

const router = express.Router();

// Get all/searched Courses
router.get("/", async (req, res) => {
  let courses = await db.collection("Courses");
  const { search } = req.query;
  let results;
  if (search) {
    results = await courses.aggregate(
      [
        {
          '$search': {
            'index': 'search-courses', 
            'autocomplete': {
              'query': search,
              'path': 'searchTitle',
            }
          }
        }, {
          '$limit': 5
        }, {
          '$project': {
            'courseId': 1, 
            'fullTitle': 1, 
            'courseTypeName': 1, 
            'orgName': 1,
          }
        }
      ]
    ).toArray();
  } else {
    results = await courses.find({}).toArray();
  }  
  res.send(results).status(200);
});

// Get Course by ID
router.get("/:courseId", async (req, res) => {
  let courses = await db.collection("Courses");
  let query = {courseId: req.params.courseId};
  let result = await courses.findOne(query);

  if (!result) {
    res.send("Course not found").status(404);
  } else {
    
    // Find and add Spks to Course
    let courseSpk = await db.collection("Course-SPK");
    let spksObject = await courseSpk.find(query).toArray();
    if (spksObject.length) {
      let spkIds = [];
      spksObject.forEach((spk) => {
        spkIds.push(spk.spkId);
      });
      result.spkIds = spkIds;
    }
    
    // Find and add Subjects to Course
    let courseSubject = await db.collection("Course-Subject");
    let subjectsObject = await courseSubject.find(query).toArray();
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