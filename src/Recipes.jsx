import React, { useState, useEffect } from "react";
import axios from "axios";

import classes from "./Recipes.module.css";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ingredientSearchValue, setIngredientSearchValue] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [countries, setCountries] = useState([]);

  const parseIngredients = () => {
    const res = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!res.includes(ingredient.ingredient))
          res.push(ingredient.ingredient);
      });
    });
    return res;
  };

  // Creates a list of all countries from recipes
  const parseCountries = (recipes) => {
    const res = [];
    recipes.forEach((recipe) => {
      if (!res.includes(recipe.country)) res.push(recipe.country);
    });
    return res;
  };

  // Fetches all recipe data
  useEffect(() => {
    axios.get(`http://localhost:3004/recipes`).then((data) => {
      setRecipes(data.data);
      setFilteredRecipes(data.data);
      setCountries(parseCountries(data.data));
      console.log(parseIngredients());
    });
  }, []);

  // Filters recipes by text search, ingredient search and country
  // and sets the value of filteredRecipes
  const filterAll = (textValue, ingredientValue, countryValue) => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        let match = false;
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.includes(ingredientValue)) match = true;
        });
        return (
          match &&
          recipe.country.toLowerCase().includes(countryValue) &&
          (recipe.name.toLowerCase().includes(textValue) ||
            recipe.description.toLowerCase().includes(textValue))
        );
      })
    );
  };

  // Universal function to filter recipes by any search input
  const handleSearches = (e, searchField) => {
    const value = e.target.value.toLowerCase().trim();
    if (searchField === "text") {
      setSearchValue(value);
      filterAll(value, ingredientSearchValue, countrySearchValue);
    } else if (searchField === "ingredient") {
      setIngredientSearchValue(value);
      filterAll(searchValue, value, countrySearchValue);
    } else if (searchField === "country") {
      setCountrySearchValue(value);
      filterAll(searchValue, ingredientSearchValue, value);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <input
        placeholder="Search"
        type="text"
        value={searchValue}
        onChange={(e) => handleSearches(e, "text")}
      />
      <input
        placeholder="Search by ingredient"
        type="text"
        value={ingredientSearchValue}
        onChange={(e) => handleSearches(e, "ingredient")}
      />
      <select defaultValue={""} onChange={(e) => handleSearches(e, "country")}>
        <option value="">All countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className={classes.cards_container}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} info={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
