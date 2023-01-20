import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import classes from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.error}>
      <h1>404</h1>
      <p>Oops, this page doesn't exist</p>
      <div className={classes.buttons}>
        <button onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
