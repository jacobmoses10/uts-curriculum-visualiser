import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../img/uts-logo.png"

export default function NavBar() {
  return(
    <div>
      <nav>
        <NavLink className="navbar-brand" to="/">
          <img style={{"width" : 15 + '%'}} src={logo} alt="UTS"></img>
        </NavLink>
      </nav>
    </div>
  );
}