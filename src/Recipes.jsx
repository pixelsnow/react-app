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

  const parseIngredients = (recipes) => {
    const res = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!res.includes(ingredient.ingredient))
          res.push(ingredient.ingredient);
      });
    });
    return res;
  };

  const parseCountries = (recipes) => {
    const res = [];
    recipes.forEach((recipe) => {
      if (!res.includes(recipe.country)) res.push(recipe.country);
    });
    return res;
  };

  useEffect(() => {
    axios.get(`http://localhost:3004/recipes`).then((data) => {
      setRecipes(data.data);
      setFilteredRecipes(data.data);
      setCountries(parseCountries(data.data));
    });
  }, []);

  const filterByText = (recipeList, text) => {
    setFilteredRecipes(
      recipeList.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(text) ||
          recipe.description.toLowerCase().includes(text)
        );
      })
    );
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase().trim());
    filterByText(recipes, e.target.value.toLowerCase().trim());
  };

  const filterByIngredient = (recipeList, ingredientValue) => {
    setFilteredRecipes(
      recipeList.filter((recipe) => {
        let match = false;
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.includes(ingredientValue)) match = true;
        });
        return match;
      })
    );
  };

  const handleIngredientSearch = (e) => {
    setIngredientSearchValue(e.target.value.toLowerCase().trim());
    filterByIngredient(recipes, e.target.value.toLowerCase().trim());
    filterByText(filteredRecipes, searchValue);
  };

  const handleCountrySearch = (e) => {
    setCountrySearchValue(e.target.value.toLowerCase().trim());
    setFilteredRecipes(
      recipes.filter((recipe) => {
        return recipe.country
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim());
      })
    );
  };

  const filterAll = () => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        let match = false;
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.includes(ingredientSearchValue))
            match = true;
        });
        return (
          match &&
          recipe.country.toLowerCase().includes(countrySearchValue) &&
          (recipe.name.toLowerCase().includes(searchValue) ||
            recipe.description.toLowerCase().includes(searchValue))
        );
      })
    );
  };

  const handleSearches = (e, searchField) => {
    const value = e.target.value.toLowerCase().trim();
    if (searchField === "text") setSearchValue(value);
    else if (searchField === "ingredient") setIngredientSearchValue(value);
    else if (searchField === "country") setCountrySearchValue(value);
    filterAll();
  };

  return (
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      />
      <input
        type="text"
        value={ingredientSearchValue}
        onChange={(e) => handleIngredientSearch(e)}
      />
      <select defaultValue={""} onChange={(e) => handleCountrySearch(e)}>
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
