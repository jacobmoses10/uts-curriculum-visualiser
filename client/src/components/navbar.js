import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../img/uts-logo-white.png"

export default function NavBar() {
  return(
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} width="110" alt="UTS"></img>
        </NavLink>
      </nav>
  );
}