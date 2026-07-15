const { Router } = require("express");
const {
  categoryController,
  getCategoriesController,
} = require("../controllers/category.controller");

const categoryRoutes = Router();

categoryRoutes.post("/", categoryController);
categoryRoutes.get("/", getCategoriesController);

module.exports = categoryRoutes;
