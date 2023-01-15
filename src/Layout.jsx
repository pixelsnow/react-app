import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import classes from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
