const { Router } = require("express");
const {
  productController,
  createProductController,
  getProductsByCategoryController,
} = require("../controllers/product.controller");

const productRoutes = Router();

productRoutes.get("/", productController);
productRoutes.post("/", createProductController);
productRoutes.get("/category/:categoryId", getProductsByCategoryController);

module.exports = productRoutes;
