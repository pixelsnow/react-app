import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import classes from "./RecipePage.module.css";
import NotFound from "./NotFound";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState("");
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes`).then((data) => {
      const allRecipes = data.data;
      const found = allRecipes.find((recipe) => recipe.id == recipeId);
      if (found === undefined) {
        setError(true);
        return;
      }
      setRecipeInfo(found);
      axios
        .get(`https://restcountries.com/v3.1/name/${found.country}`)
        .then((data) => {
          setFlag(data.data[0].flags.svg);
        })
        .catch((err) => {
          setFlag("");
        });
    });
  }, []);

  if (error) return <NotFound />;
  else
    return (
      <div>
        <button onClick={() => navigate(-1)}>{`<-`}</button>
        <h1>{recipeInfo.name}</h1>
        <div className={classes.flag_container}>
          <img className={classes.flag} src={flag} alt={recipeInfo.country} />
        </div>
        <p>by {recipeInfo.author || "unknown author"}</p>

        <div className={classes.image_container}>
          <img
            className={classes.image}
            src={recipeInfo.image}
            alt={recipeInfo.name}
          />
        </div>
        <p>{recipeInfo.description}</p>
        <div className={classes.ingredient_list}>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recipeInfo.ingredients &&
                recipeInfo.ingredients.map((ingredient) => (
                  <tr key={ingredient.ingredient}>
                    <td>{ingredient.ingredient}</td>
                    <td>{ingredient.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p>{recipeInfo.instructions}</p>
      </div>
    );
};

export default RecipePage;
