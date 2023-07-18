const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const recipeControllers = require("./controllers/recipeControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

/* Routes Recettes */

router.get("/recipes", recipeControllers.browse);

/* Routes Utilisateurs */

router.post("/user", userControllers.add);

module.exports = router;
