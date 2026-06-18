const { Router } = require("express");
const { productController, createProductController  } = require("../controllers/product.controller");

const productRoutes = Router();


productRoutes.get("/", productController);
productRoutes.post("/", createProductController);


module.exports = productRoutes;