import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "react-bootstrap-icons";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(50);
  const [hide, setHide] = useState(false);

  const Course = (props) => (
    <tr>
      <td>{props.course.courseId}</td>
      <td>{props.course.fullTitle}</td>
      <td hidden={hide}>{props.course.courseTypeName}</td>
      <td hidden={hide}>{props.course.orgName}</td>
      <td>
        <Link className="btn btn-outline-primary" to={`/course/${props.course.courseId}`}>Select</Link>
      </td>
    </tr>
  );

  useEffect(() => {

    async function getCourses() {
      const url = `${process.env.REACT_APP_BASE_URL}/course?search=${search}&limit=${limit}`;
      const response = await fetch(url);
      const courses = await response.json();
      setCourses(courses);
    }

    // hide elements for mobile
    (window.innerWidth < 700) ? setHide(true) : setHide(false);
    
    getCourses();
  }, [search, limit]);

  const onChange = (input) => {
    setSearch(input);
    setLimit(50);
  }
  
  const onClick = () => {
		setLimit(limit + 50);
	};

  return (
    <div className="container">
      <div className="input-group mb-3" role="search">
        <input name="search" className="form-control mx-1 my-3" type="search" placeholder="Search" 
          aria-label="Search" onChange={({currentTarget: input}) => onChange(input.value)}/>
      </div>
      <table className="table table-hover border-top" style={{ marginTop: 50 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th hidden={hide}>Type</th>
            <th hidden={hide}>Faculty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <Course course={course} key={course._id}/>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2" onClick={() => onClick()}>Load More</button>
        <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}><ArrowUp/></button>
      </div>
    </div>
  );
}