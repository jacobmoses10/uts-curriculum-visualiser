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
              <NavLink className={getActive("/")} aria-current="page" to="/">Home</NavLink>                     
              <NavLink className={getActive("/search")} to="/search">Courses</NavLink>           
          </ul>
          <NavLink className="icon-link icon-link-hover link-light mx-3" to="/search">
            <Search size={20}/>
          </NavLink>
          <a className="icon-link icon-link-hover link-light mx-2" target="_blank" rel="noreferrer"
            href="https://github.com/jacobmoses10/uts-curriculum-visualiser">
            <Github size={25}/>
          </a>
        </div>
      </nav>
  );
}
