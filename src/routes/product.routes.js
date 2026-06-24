const { Router } = require("express");
const { 
  productController, 
  createProductController, 
  getProductsByCategoryController, 
  deleteProductsController,
  updateProductController 
} = require("../controllers/product.controller");

const productRoutes = Router();

// 1. Listar todos os produtos
productRoutes.get("/", productController);

// 2. Criar um novo produto
productRoutes.post("/", createProductController);

// 3. Listar produtos filtrados por categoria (Usa o req.params)
productRoutes.get("/category/:categoryId", getProductsByCategoryController);

// 4. Deletar um produto específico (Usa o req.params)
productRoutes.delete("/:id", deleteProductsController);

productRoutes.put("/:id",updateProductController);

// Exporta APENAS as rotas de produtos que pertencem a este arquivo
module.exports = productRoutes;