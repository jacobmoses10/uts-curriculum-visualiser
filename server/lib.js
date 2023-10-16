import db from "./conn.js";

// Get Course by ID
export async function getCourse(courseId) {
  let courseDb = await db.collection("Courses");
  let courseQuery = {courseId: courseId};
  let result = await courseDb.findOne(courseQuery);

  if (!result) {
    return null;
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
    
    return result;
  }
}

// Get SPK by ID
export async function getSpk(spkId) {
  let spkDb = await db.collection("SPKs");
  let query = {spkId: spkId};
  let result = await spkDb.findOne(query);

  if (!result) {
    return null;
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

    return result;
  }
}

// Get Subject by ID
export async function getSubject(subjectId) {
  let subjects = await db.collection("Subjects");
  let query = {subjectId: subjectId};
  let result = await subjects.findOne(query);

  if (!result) {
    return null;
  } else {
    
    // Find and add Pre-Requisites to Subject
    let prereqDb = await db.collection("Prerequisites");
    let queryCol2 = {subjectId2: subjectId};
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
    
    return result;
  }
}