import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import classes from "./RecipeCard.module.css";

const RecipeCard = ({ info }) => {
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${info.country}`)
      .then((data) => {
        console.log(data.data[0]);
        setFlag(data.data[0].flags.svg);
      });
  }, []);

  return (
    <div className={classes.card}>
      <NavLink to={info.id}>
        <h2>{info.name}</h2>
      </NavLink>
      <div className={classes.flag_container}>
        <img className={classes.flag} src={flag} alt={info.country} />
      </div>
      <div className={classes.recipe_photo_container}>
        <img
          className={classes.recipe_photo}
          src={info.image}
          alt={info.name}
        />
      </div>
    </div>
  );
};

export default RecipeCard;
