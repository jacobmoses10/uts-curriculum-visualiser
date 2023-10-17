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

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  window.scrollTo(0, 0);

  useEffect(() => {

    async function getCourses() {
      const response = await fetch(`http://localhost:4000/course?search=${search}`);
      const courses = await response.json();
      setCourses(courses);
    }
    
    getCourses();
  }, [search]);

  return (
    <div className="container">
      <div className="input-group mb-3" role="search">
        <input name="search" className="form-control mx-1 my-3" type="search" placeholder="Search" 
          aria-label="Search" onChange={({currentTarget: input}) => setSearch(input.value)}/>
      </div>
      <table className="table table-hover border-top" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Faculty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <Course course={course} key={course._id}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}