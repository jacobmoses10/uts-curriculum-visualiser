import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Course = (props) => (
  <tr>
    <td>{props.course.courseId}</td>
    <td>{props.course.fullTitle}</td>
    <td>{props.course.courseTypeName}</td>
    <td>{props.course.orgName}</td>
    <td>
      <Link className="btn btn-outline-primary" to={`/course/${props.course.courseId}`}>Select</Link>
    </td>
  </tr>
);

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {

    async function getCourses() {
      const response = await fetch(`http://localhost:4000/course?search=${key}`);
      const courses = await response.json();
      setCourses(courses);
    }
    
    getCourses();
    return;
  }, [key]);

  function courseList() {
    return courses.map((course)=> {
      return (
        <Course
          course={course}
          key={course.fullTitle}
        />
      );
    });
  }

  return (
    <div>
      <form className="input-group mb-3">
          <input className="form-control" placeholder="Search" aria-label="Search" value={key}
            onChange={(e) => setKey(e.target.value)}/>
          <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <h3>Course List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Faculty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{courseList()}</tbody>
      </table>
    </div>
  );

}