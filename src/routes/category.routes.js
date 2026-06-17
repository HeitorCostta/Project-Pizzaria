const { Router } = require("express");
const { categoryController } = require("../controllers/category.controller");

const categoryRoutes = Router();

categoryRoutes.post("/", categoryController);

module.exports = categoryRoutes;
