import React from "react";
import { Link } from "react-router-dom";
import img from "../img/home-page-img.png";

export default function Home() {

  return(
    <div className="container d-flex">
      <div className="col p-3">
        <h1 className="mt-3">UTS Curriculum Visualiser</h1>
        <hr/>
        <h5 className="mb-5 fw-light lh-lg">
          An engineering capstone project designed to help students 
          better understand their course requirements. This app is
          based on data from the 2023 Curriculum.
        </h5>
        <h5 className="fw-light">
          Students can use this app to find:
        </h5>
        <ul className="fw-light fs-5 lh-lg mb-5">
          <li>Courses</li>
          <li>Majors</li>
          <li>Subjects</li>
          <li>Electives</li>
          <li>Prerequisites</li>
        </ul>
        <hr/>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-lg btn-outline-primary" to={`/search`}>Get Started</Link>
        </div>
      </div>
      <div className="col p-3 d-flex justify-content-center">
        <img src={img} alt="UTS CV" width="90%"/>
      </div>      
    </div>
  );
}