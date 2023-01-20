import React from "react";

import bgVid from "./pot.mp4";

import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.hero}>
      <video className={classes.bg_video} autoPlay loop muted>
        <source src={bgVid} type="video/mp4" />
      </video>
    </div>
  );
};

export default Hero;
