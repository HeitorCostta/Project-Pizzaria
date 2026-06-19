const {
  getProducts,
  createProducts,
  getProductsByCategory,
} = require("../services/product.service");

// Controller de listagem
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

    // Validação extra que conversamos (garantir que o preço é número)
    if (typeof price !== "number") {
      return res.status(400).json({
        error: "Bad request",
        message: "O campo 'price' deve ser um número válido.",
      });
    }

    // Correção 3: O service é chamado AQUI, totalmente livre e fora do bloco IF
    const product = await createProducts({
      name,
      price,
      description,
      banner,
      categoryId,
    });

    // Retorna o produto criado e a mensagem de sucesso
    return res.status(201).json({
      product,
      message: "Produto criado com sucesso! 🍕",
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Ocorreu um erro ao criar o produto.",
    });
  }
}

async function getProductsByCategoryController(req, res) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        error: "Bad request",
        message: "O campo 'categoryId' é obrigatório.",
      });
    }

    const products = await getProductsByCategory(categoryId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Ocorreu um erro ao buscar produtos por categoria.",
    });
  }
}

module.exports = {
  productController,
  createProductController,
  getProductsByCategoryController,
};
