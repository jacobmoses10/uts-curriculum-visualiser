import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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
      <dl class="row">
        <dt class="col-sm-3">Version</dt>
        <dd class="col-sm-9">v{course.coursev}</dd>
        <dt class="col-sm-3">Type</dt>
        <dd class="col-sm-9">{course.courseTypeId}: {course.courseTypeName}</dd>
        <dt class="col-sm-3">Faculty</dt>
        <dd class="col-sm-9">{course.orgName}</dd>
        <dt class="col-sm-3">Field of Education</dt>
        <dd class="col-sm-9">{course.primaryFoeName} {course.secondaryFoeName}</dd>
        <dt class="col-sm-3">Time to Complete</dt>
        <dd class="col-sm-9">{course.expectedTime} Years</dd>
        <dt class="col-sm-3">Award Level</dt>
        <dd class="col-sm-9">{course.awardLevelType}</dd>
        <dt class="col-sm-3">Study Type</dt>
        <dd class="col-sm-9">{course.studyType}</dd>
        <dt class="col-sm-3">Study Area</dt>
        <dd class="col-sm-9">{course.studyAreaId}: {course.studyAreaName}</dd>
        <dt class="col-sm-3">Stage</dt>
        <dd class="col-sm-9">{course.stage}</dd>
          
      </dl>
    </div>
  );
}