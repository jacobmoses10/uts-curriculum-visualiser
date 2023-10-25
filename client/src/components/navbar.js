import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Search, Github } from "react-bootstrap-icons";
import logo from "../img/uts-logo-white.png";

export default function NavBar() {
  const location = useLocation();
  
  function getActive(page) {
    return (page === location.pathname) ? "nav-link active" : "nav-link";
  }

  return(
      <nav className="navbar navbar-expand-md bg-primary" style={{"background":"#272b4d"}} data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} width="110" alt="UTS"></img>
          </NavLink>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <a className={getActive("/")} aria-current="page" href="/">Home</a>                     
              <a className={getActive("/search")} href="/search">Courses</a>           
          </ul>
          <a className="icon-link icon-link-hover link-light mx-3" href="/search">
            <Search size={20}/>
          </a>
          <a className="icon-link icon-link-hover link-light mx-2" target="_blank" rel="noreferrer"
            href="https://github.com/jacobmoses10/uts-curriculum-visualiser">
            <Github size={25}/>
          </a>
        </div>
      </nav>
  );
}