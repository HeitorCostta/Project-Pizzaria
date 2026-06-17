const { createCategory } = require("../services/category.service");

async function categoryController(req, res) {
  // 🔍 Ajustado para uma chave só
  try {
    const { name } = req.body;

    // 1. Valida se o campo existe e não está em branco
    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Bad Request",
        message: "O campo 'name' é obrigatório.",
      });
    }

    // 2. Valida se é texto
    if (typeof name !== "string") {
      return res.status(400).json({
        error: "Bad Request",
        message: "O campo 'name' deve ser do tipo texto.",
      });
    }

    const category = await createCategory({ name });

    // Retorna a categoria criada com o ID do banco e o status 201
    return res
      .status(201)
      .json({ category, message: "Categoria criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar categoria:", error); // Bom para você ver o erro no terminal se der ruim
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Ocorreu um erro ao criar a categoria.",
    });
  }
}

module.exports = { categoryController };
