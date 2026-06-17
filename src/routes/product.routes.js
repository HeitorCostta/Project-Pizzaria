const { Router } = require("express");
const { productController } = require("../controllers/product.controller");

const productRoutes = Router();

productRoutes.get("/", productController);

module.exports = productRoutes;
