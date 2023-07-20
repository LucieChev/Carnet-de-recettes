import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import Recipes from "./pages/Recipes";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";
import ResumeRecipe from "./components/ResumeRecipe";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creation" element={<CreateRecipe />} />
        <Route path="/creation/resume" element={<ResumeRecipe />} />
        <Route path="/recettes" element={<Recipes />} />
        <Route path="/recette/:id" element={<RecipeDetails />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
