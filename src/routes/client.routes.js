const { Router } = require("express");
const { clientController } = require("../controllers/client.controller");

const clientRoutes = Router();

// Puxando a função direto do objeto que veio do require
clientRoutes.post("/", clientController);

module.exports = clientRoutes;
