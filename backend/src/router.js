const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const recipeControllers = require("./controllers/recipeControllers");
const { getUserByEmailMiddleware } = require("./controllers/authControllers");

const {
  verifyPassword,
  hashPassword,
  verifyToken,
  logout,
} = require("./services/auth");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

/* Routes Recettes */

router.get("/recipes", recipeControllers.browse);
router.get("/recipe/:id", recipeControllers.read);
router.post("/recipe/register", recipeControllers.add);
router.put("/recipe/:id", recipeControllers.edit);
router.delete("/recipe/:id", recipeControllers.destroy);

/* Routes Utilisateurs */

router.post("/user", userControllers.add);
router.post("/user/login", getUserByEmailMiddleware, verifyPassword);
router.get("/user/logout", verifyToken, logout);
router.post("/user/register", hashPassword, userControllers.add);

module.exports = router;
