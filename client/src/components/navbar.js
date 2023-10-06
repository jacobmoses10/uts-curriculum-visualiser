import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../img/uts-logo-white.png"

export default function NavBar() {
  return(
    <div className="container-fluid bg-black">
      <nav className="navbar">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} width="150" alt="UTS"></img>
        </NavLink>
      </nav>
    </div>
  );
}