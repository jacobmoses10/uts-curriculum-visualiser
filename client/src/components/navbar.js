import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Search } from "react-bootstrap-icons";
import logo from "../img/uts-logo-white.png";

export default function NavBar() {
  return(
      <nav className="navbar navbar-expand-md bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} width="110" alt="UTS"></img>
          </NavLink>
          <span class="navbar-text fs-3 fw-bold text-light">
            Curriculum Visualiser
          </span>
          <a class="icon-link mx-3" href="/">
            <Search color="white" size={20}/>
          </a>
        </div>
      </nav>
  );
}