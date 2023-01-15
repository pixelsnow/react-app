import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./logo.svg";

import Nav from "./Nav";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <div className={classes.logo_container}>
          <ReactLogo className={classes.logo} />
        </div>
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
