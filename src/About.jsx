import React from "react";

import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.about}>
      <h1>About TasteIT</h1>
      <p>
        This project was created by{" "}
        <a href="https://github.com/pixelsnow">Valeria Vagapova</a> as a part of
        Full Stack Web Developer program at{" "}
        <a href="https://en.bc.fi/" target="_blank" rel="noreferrer">
          Business College Helsinki
        </a>
      </p>
    </div>
  );
};

export default About;
