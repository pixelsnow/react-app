import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import NotFound from "./NotFound";

import classes from "./RecipePage.module.css";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
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
      if (found.country.length)
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
      <div className={classes.recipe_page}>
        <div className={classes.recipe_title}>
          <button className={classes.back_button} onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1>{recipeInfo.name}</h1>
          <div className={classes.flag_container}>
            <img className={classes.flag} src={flag} alt={recipeInfo.country} />
          </div>
        </div>
        <div className={classes.recipe_body}>
          <div className={classes.image_container}>
            {!imgLoaded && (
              <div className={classes.img_placeholder}>
                <span className="material-symbols-outlined">
                  no_photography
                </span>
              </div>
            )}
            <img
              className={classes.recipe_photo + (imgLoaded ? "" : " hidden")}
              src={recipeInfo.image}
              alt={recipeInfo.name}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          <div className={classes.recipe_text}>
            <div className={classes.meta_info}>
              <p>
                from{" "}
                {recipeInfo.country && recipeInfo.country.length
                  ? recipeInfo.country
                  : "unknown country"}
              </p>
              <p className={classes.author}>
                by{" "}
                {recipeInfo.author && recipeInfo.author.length
                  ? recipeInfo.author
                  : "unknown author"}
              </p>
            </div>
            <p className={classes.description}>{recipeInfo.description}</p>
            {recipeInfo.ingredients && recipeInfo.ingredients.length > 0 && (
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
            )}

            <p className={classes.instructions}>{recipeInfo.instructions}</p>
          </div>
        </div>
      </div>
    );
};

export default RecipePage;
