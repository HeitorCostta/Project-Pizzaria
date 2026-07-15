const { Router } = require("express");
const {
  createOrderController,
  getOrderController,
  addItemController,
  removeItemController,
  updateItemController,
  getOrderDetailsController,
} = require("../controllers/order.controller");

const orderRoutes = Router();

orderRoutes.post("/", createOrderController);
orderRoutes.get("/", getOrderController);
orderRoutes.post("/item", addItemController);
orderRoutes.delete("/item/:id", removeItemController);
orderRoutes.put("/finish/:id", updateItemController);
// Importe o seu novo controller lá no topo do arquivo de rotas e depois declare:
orderRoutes.get("/:id/detail", getOrderDetailsController);

module.exports = orderRoutes;
