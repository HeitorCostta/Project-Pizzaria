const {
  getProducts,
  createProducts,
  getProductsByCategory,
  deleteProducts,
  updateProducts
} = require("../services/product.service");

// Controller de listagem geral
async function productController(req, res) {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ error: "Erro interno ao buscar produtos." });
  }
}

// Controller de Cadastro
async function createProductController(req, res) {
  try {
    const { name, price, description, banner, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        error: "Bad request",
        message: "Os campos 'name', 'price' e 'categoryId' são obrigatórios.",
      });
    }

    if (typeof price !== "number") {
      return res.status(400).json({
        error: "Bad request",
        message: "O campo 'price' deve ser um número válido.",
      });
    }

    const product = await createProducts({ name, price, description, banner, categoryId });
    return res.status(201).json({ product, message: "Produto criado com sucesso! 🍕" });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ error: "Internal Server Error", message: "Erro ao criar o produto." });
  }
}

// Controller de Filtro por Categoria
async function getProductsByCategoryController(req, res) {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ error: "Bad request", message: "O campo 'categoryId' é obrigatório." });
    }
    const products = await getProductsByCategory(categoryId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return res.status(500).json({ error: "Internal Server Error", message: "Erro ao buscar produtos por categoria." });
  }
}

// Controller de Deleção
async function deleteProductsController(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Bad request", message: "Id Inválido" });
    }
    const productDelete = await deleteProducts(id);
    return res.status(200).json({ productDelete, message: "Produto Deletado com Sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return res.status(500).json({ error: "Internal server error", message: "Erro ao deletar produto" });
  }
}

// Controller de Atualização (O Alvo + A Carga)
async function updateProductController(req, res) {
  try {
    const { id } = req.params; // Alvo
    const { name, price, description, banner, categoryId } = req.body; // Carga

    if (!id) {
      return res.status(400).json({ error: "Bad Request", message: "O campo Id é obrigatório" });
    }

    if (price && typeof price !== "number") {
      return res.status(400).json({ error: "Bad request", message: "O campo 'price' deve ser um número válido." });
    }

    const productUpdate = await updateProducts(id, { name, price, description, banner, categoryId });
    return res.status(200).json({ productUpdate, message: "Produto atualizado com sucesso 🍕" });
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    return res.status(500).json({ error: "Internal server error", message: "Erro ao atualizar o produto" });
  }
}

module.exports = {
  productController,
  createProductController,
  getProductsByCategoryController,
  deleteProductsController,
  updateProductController,
};