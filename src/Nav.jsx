import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <NavLink to="recipes">
          <li>Browse recipes</li>
        </NavLink>
        <NavLink to="about">
          <li>About</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
