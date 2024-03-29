import express from "express";
import db from "../conn.js";
import { getCourse, getSpk } from "../lib.js";

const router = express.Router();

// Get Paginated Searched Courses
router.get("/", async (req, res) => {
  let courses = await db.collection("Courses");
  const search = req.query.search;
  const limit = parseInt(req.query.limit);

  let agg = [];
  if (search) {
    agg.push(
      {
        '$search': {
          'index': 'search-courses', 
          'autocomplete': {
            'query': search,
            'path': 'searchTitle',
          }
        }
      }, {
        '$project': {
          'courseId': 1, 
          'fullTitle': 1, 
          'courseTypeName': 1, 
          'orgName': 1,
        }
      } 
    );
  }  
  
  if (limit) {
    agg.push({
      '$limit': limit
    });
  }

  const results = await courses.aggregate(agg).toArray();
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
      name: result.courseId,
      type: 'course',
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
    res.send("Course not found").status(404);
  }  
});

export default router;