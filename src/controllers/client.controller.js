const {
  createClient,
  findClientByTelephone,
} = require("../services/client.service");

async function clientController(req, res) {
  try {
    const { username, telephone } = req.body;

    if (!username || !username.trim() || !telephone || !telephone.trim()) {
      return res
        .status(400)
        .json({
          error: "Bad Request",
          message: "Os campos 'username' e 'telephone' são obrigatórios.",
        });
    }

    if (typeof username !== "string" || typeof telephone !== "string") {
      return res
        .status(400)
        .json({
          error: "Bad Request",
          message:
            "Os campos 'username' e 'telephone' devem ser do tipo texto.",
        });
    }

    const clientExists = await findClientByTelephone(telephone);
    if (clientExists) {
      return res
        .status(409)
        .json({
          error: "Conflict",
          message:
            "Já existe um cliente cadastrado com este número de telefone.",
        });
    }

    const client = await createClient({ username, telephone });
    return res.status(201).json(client);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).json({ error: "Erro interno ao criar o cliente." });
  }
}

module.exports = { clientController };
