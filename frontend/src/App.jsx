import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "./App.css";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/Recipes";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/création" element={<CreateRecipe />} />
        <Route path="/recettes" element={<Recipe />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
