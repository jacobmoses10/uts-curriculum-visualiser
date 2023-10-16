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

  function getFoe() {
    if (course.primaryFoeName) {
      return(
        <div>
          <dt className="sm-2">Field of Education</dt>
          <dd className="sm-9">{course.primaryFoeName} {course.secondaryFoeName}</dd>
        </div>
      );
    }
  }

  function getDuration() {
    if (course.expectedTime === "1") {
      return(<dd className="sm-9">{course.expectedTime} Year</dd>);
    } else {
      return(<dd className="sm-9">{course.expectedTime} Years</dd>);
    }
  }

  function getAwardLevel() {
    if (course.awardLevelType) {
      return(
        <div>
          <dt className="sm-2">Award Level</dt>
          <dd className="sm-9">{course.awardLevelType}</dd>
        </div>
      );
    }
  }

  return(
    <div className="container">
      <h2>{course.courseId} {course.fullTitle}</h2>
      <hr/>

      <div className="row">
      <dl className="col">
        <dt className="sm-2">Course Version</dt>
        <dd className="sm-9">v{course.coursev}</dd>
        <dt className="sm-2">Type</dt>
        <dd className="sm-9">{course.courseTypeId}: {course.courseTypeName}</dd>
        <dt className="sm-2">Faculty</dt>
        <dd className="sm-9">{course.orgName}</dd>
        {getFoe()}
        <dt className="sm-2">Course Duration</dt>
        {getDuration()}
      </dl>

      <dl className="col">
        {getAwardLevel()}
        <dt className="sm-2">Study Type</dt>
        <dd className="sm-9">{course.studyType}</dd>
        <dt className="sm-2">Study Area</dt>
        <dd className="sm-9">{course.studyAreaId}: {course.studyAreaName}</dd>
        <dt className="sm-2">Stage</dt>
        <dd className="sm-9">{course.stage}</dd>
      </dl>
      </div>
      <hr/>

      <Cards data = {course}/>
    </div>
  );
}

