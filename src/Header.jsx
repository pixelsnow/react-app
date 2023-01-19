import React from "react";
import { NavLink } from "react-router-dom";

import Nav from "./Nav";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <NavLink className={classes.logo_link} to="/">
        <div className={classes.logo_container}>
          <span className="material-symbols-outlined">local_dining</span>
          <h2>TasteIT</h2>
        </div>
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
