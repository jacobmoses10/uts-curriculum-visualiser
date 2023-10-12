import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cards from "./cards";

export default function Course() {
  
  const [course, setCourse] = useState({});
  const [tree, setTree] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getCourse() {
      const courseResponse = await fetch(`http://localhost:4000/course/${params.id.toString()}`);
      const treeResponse = await fetch(`http://localhost:4000/course/tree/${params.id.toString()}`);

      const course = await courseResponse.json();
      const tree = await treeResponse.json();
      
      setCourse(course);
      setTree(tree);
    }
    getCourse();
    return;
  }, [params.id]);

  return(
    <div>
      <h2>{course.courseId} {course.fullTitle}</h2>
      
      <dl className="row">
        <dt className="col-sm-2">Version</dt>
        <dd className="col-sm-9">v{course.coursev}</dd>
        <dt className="col-sm-2">Type</dt>
        <dd className="col-sm-9">{course.courseTypeId}: {course.courseTypeName}</dd>
        <dt className="col-sm-2">Faculty</dt>
        <dd className="col-sm-9">{course.orgName}</dd>
        <dt className="col-sm-2">Field of Education</dt>
        <dd className="col-sm-9">{course.primaryFoeName} {course.secondaryFoeName}</dd>
        <dt className="col-sm-2">Time to Complete</dt>
        <dd className="col-sm-9">{course.expectedTime} Years</dd>
        <dt className="col-sm-2">Award Level</dt>
        <dd className="col-sm-9">{course.awardLevelType}</dd>
        <dt className="col-sm-2">Study Type</dt>
        <dd className="col-sm-9">{course.studyType}</dd>
        <dt className="col-sm-2">Study Area</dt>
        <dd className="col-sm-9">{course.studyAreaId}: {course.studyAreaName}</dd>
        <dt className="col-sm-2">Stage</dt>
        <dd className="col-sm-9">{course.stage}</dd> 
      </dl>

      <Cards data = {course}/>
    </div>
  );
}

