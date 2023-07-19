import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipes";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/création" element={<CreateRecipe />} />
        <Route path="/recettes" element={<Recipe />} />
        <Route path="/recette/:id" element={<RecipeDetails />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
