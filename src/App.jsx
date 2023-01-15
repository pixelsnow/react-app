import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Recipes from "./Recipes";
import RecipePage from "./RecipePage";
import About from "./About";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="about" element={<About />} />
          <Route path=":categoryName" element={<RecipePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
