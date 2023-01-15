import React, { useParams } from "react";

import classes from "./RecipePage.module.css";

const RecipePage = () => {
  const { recipeId } = useParams();

  return (
    <div>
      <h1>Recipe page</h1>
    </div>
  );
};

export default RecipePage;
