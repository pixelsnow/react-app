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
        setFlag(data.data[0].flags.svg);
      });
  }, []);

  return (
    <div className={classes.card}>
      <div className={classes.recipe_photo_container}>
        <img
          className={classes.recipe_photo}
          src={info.image}
          alt={info.name}
        />
      </div>
      <div className={classes.info_container}>
        <NavLink className={classes.card_link} to={`/${info.id}`}>
          <h2>{info.name}</h2>
        </NavLink>
        <p>
          {info.description.substring(0, 70)}
          {info.description.length > 70 && `...`}
        </p>
        <div className={classes.extra_info}>
          <p>by {info.author}</p>

          <img className={classes.flag} src={flag} alt={info.country} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
