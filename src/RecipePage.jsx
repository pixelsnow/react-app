import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./RecipePage.module.css";

const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(recipeId);
  }, [recipeId]);

  return (
    <div>
      <h1>Recipe page {recipeId}</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default RecipePage;
