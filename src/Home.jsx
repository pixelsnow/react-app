import React from "react";
import { NavLink } from "react-router-dom";

import Hero from "./Hero";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className={classes.cta_container}>
        <div className={classes.cta}>
          <NavLink to="">
            <h3></h3>
          </NavLink>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
