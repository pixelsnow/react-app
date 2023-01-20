import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

import classes from "./AddRecipePage.module.css";

const emptyRecipe = {
  id: undefined,
  name: "",
  author: "",
  country: "",
  description: "",
  image: "",
  ingredients: [
    {
      ingredient: "",
      quantity: "",
    },
  ],
  instructions: "",
};

const AddRecipePage = () => {
  const [recipe, setRecipe] = useState(cloneDeep(emptyRecipe));
  const [recipePosted, setRecipePosted] = useState(false);
  const [id, setId] = useState();
  const [allCountries, setAllCountries] = useState([]);

  const changeHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const changeIngredient = (e, index) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients[index][e.target.name] = e.target.value;
    setRecipe(newRecipe);
  };

  const addIngredient = (e) => {
    e.preventDefault();
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients.push({
      ingredient: "",
      quantity: "",
    });
    setRecipe(newRecipe);
  };

  const removeIngredient = (e, index) => {
    e.preventDefault();
    if (recipe.ingredients.length <= 1) return;
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients.splice(index, 1);
    setRecipe(newRecipe);
  };

  const handlePost = (e) => {
    e.preventDefault();
    setRecipePosted(true);
    axios
      .post("http://localhost:4000/recipes", recipe)
      .then((res) => {
        setId(res.data.id);
      })
      .catch((err) => {
        alert("Server error");
      });
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((data) => {
        let fetchedCountries = [];
        data.data.forEach((country) => {
          fetchedCountries.push(country.name.common);
        });
        fetchedCountries.sort();
        setAllCountries(fetchedCountries);
      })
      .catch((err) => alert("Country list couldn't be loaded"));
  }, [allCountries]);

  const addAnother = () => {
    setRecipePosted(false);
    setRecipe(cloneDeep(emptyRecipe));
  };

  return (
    <div className={classes.form_page}>
      {!recipePosted && (
        <div>
          <h1>Add your recipe</h1>
          <form className={classes.form} onSubmit={(e) => handlePost(e)}>
            <label htmlFor="name">Title</label>
            <input
              autoFocus
              required
              maxLength="40"
              id="name"
              name="name"
              type="text"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="author">Your name</label>
            <input
              maxLength="25"
              id="author"
              name="author"
              type="text"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="description">Description</label>
            <textarea
              maxLength="100000"
              id="description"
              name="description"
              cols="30"
              rows="7"
              onChange={(e) => changeHandler(e)}
            ></textarea>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              defaultValue={""}
              onChange={(e) => changeHandler(e)}
            >
              <option value="">Select country</option>
              {allCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {recipe.ingredients.length > 0 && (
              <div className={classes.ingredient_labels}>
                <label
                  style={{
                    width: recipe.ingredients.length <= 1 ? "51%" : "47%",
                  }}
                  htmlFor="ingredient"
                >
                  Ingredient
                </label>
                <label htmlFor="quantity">Quantity</label>
              </div>
            )}
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className={classes.ingredient_container}>
                <div
                  className={
                    classes.ingredient_field +
                    (recipe.ingredients.length <= 1 ? " only" : "")
                  }
                >
                  <input
                    required
                    id="ingredient"
                    name="ingredient"
                    type="text"
                    value={recipe.ingredients[index].ingredient}
                    onChange={(e) => changeIngredient(e, index)}
                  />
                </div>
                <div
                  className={
                    classes.ingredient_field +
                    (recipe.ingredients.length <= 1 ? " only" : "")
                  }
                >
                  <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    value={recipe.ingredients[index].quantity}
                    onChange={(e) => changeIngredient(e, index)}
                  />
                </div>
                {recipe.ingredients.length > 1 && (
                  <button onClick={(e) => removeIngredient(e, index)}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
              </div>
            ))}
            {recipe.ingredients.length < 50 && (
              <button
                className={classes.add_button}
                onClick={(e) => addIngredient(e)}
              >
                +
              </button>
            )}
            <label htmlFor="image">Image link</label>
            <input
              maxLength="3000"
              id="image"
              name="image"
              type="text"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="instructions">Instructions</label>
            <textarea
              required
              maxLength="100000"
              id="instructions"
              name="instructions"
              cols="30"
              rows="7"
              onChange={(e) => changeHandler(e)}
            ></textarea>
            <div className={classes.submit_container}>
              <button className={classes.large_button} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {recipePosted && (
        <div className={classes.confirmation}>
          <p>Recipe {recipe.name} has been added successfully!</p>
          <div>
            <NavLink to={`/${id}`}>
              <button>See your recipe</button>
            </NavLink>
            <button onClick={addAnother}>Add another one</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipePage;
