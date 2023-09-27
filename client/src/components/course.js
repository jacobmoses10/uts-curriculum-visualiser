import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Visualiser from "./visualiser";

export default function Course() {
  
  const [course, setCourse] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getCourse() {
      const response = await fetch(`http://localhost:4000/course/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const course = await response.json();
      setCourse(course);
    }
    getCourse();
    return;
  }, [course, params.id]);


  return(
    <div>
      <h1>{course.courseId} {course.fullTitle}</h1>
      <dl className="row">
        <dt className="col-sm-3">Version</dt>
        <dd className="col-sm-9">v{course.coursev}</dd>
        <dt className="col-sm-3">Type</dt>
        <dd className="col-sm-9">{course.courseTypeId}: {course.courseTypeName}</dd>
        <dt className="col-sm-3">Faculty</dt>
        <dd className="col-sm-9">{course.orgName}</dd>
        <dt className="col-sm-3">Field of Education</dt>
        <dd className="col-sm-9">{course.primaryFoeName} {course.secondaryFoeName}</dd>
        <dt className="col-sm-3">Time to Complete</dt>
        <dd className="col-sm-9">{course.expectedTime} Years</dd>
        <dt className="col-sm-3">Award Level</dt>
        <dd className="col-sm-9">{course.awardLevelType}</dd>
        <dt className="col-sm-3">Study Type</dt>
        <dd className="col-sm-9">{course.studyType}</dd>
        <dt className="col-sm-3">Study Area</dt>
        <dd className="col-sm-9">{course.studyAreaId}: {course.studyAreaName}</dd>
        <dt className="col-sm-3">Stage</dt>
        <dd className="col-sm-9">{course.stage}</dd> 
      </dl>

      <Visualiser data = {course}/>

    </div>
  );
}