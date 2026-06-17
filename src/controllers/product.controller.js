const { getProducts } = require("../services/product.service");

async function productController(req, res) {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ error: "Erro interno ao buscar produtos." });
  }
}

module.exports = { productController };
