import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return(
    <div>
      <nav>
        <NavLink className="navbar-brand" to="/">
          <img style={{"width" : 25 + '%'}} src="../img/uts-logo.png" alt="UTS Visual Curriculum"></img>
        </NavLink>
      </nav>
    </div>
  );
}