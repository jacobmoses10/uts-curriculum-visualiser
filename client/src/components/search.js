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

  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`http://localhost:4000/course/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const courses = await response.json();
      setCourses(courses);
    }
    
    getCourses();
    return;
  }, [courses.length]);

  function courseList() {
    return courses.map((course)=> {
      return (<Course course={course} key={course.courseId}/>);
    });
  }

  return (
    <div className="container">
      <form className="input-group mb-3" role="search">
          <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
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