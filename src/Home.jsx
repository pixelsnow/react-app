import React from "react";
import { NavLink } from "react-router-dom";

import Hero from "./Hero";

import classes from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className={classes.cta_container}>
        <NavLink to="/recipes">
          <div className={classes.cta}>
            <h3>Browse recipes</h3>
            <p>Travel the word from your kitchen</p>
          </div>
        </NavLink>
        <NavLink to="/add_recipe">
          <div className={classes.cta}>
            <h3>Add your own recipe</h3>
            <p>
              Your country's food is missing from the database? Share your
              favourite meals with us{" "}
              <span className="material-symbols-outlined">favorite</span>
            </p>
          </div>
        </NavLink>
        <a href="https://en.bc.fi/" target="_blank" rel="noreferrer">
          <div className={classes.cta}>
            <h3>Want to know more?</h3>
            <p>Visit Business College Helsinki Website</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
