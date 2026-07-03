const { Router } = require("express");
const { createOrderController, getOrderController, addItemController, removeItemController, updateItemController } = require("../controllers/order.controller");

const orderRoutes = Router();


orderRoutes.post("/", createOrderController);
orderRoutes.get("/", getOrderController);
orderRoutes.post("/item", addItemController);
orderRoutes.delete("/item/:id",removeItemController);
orderRoutes.put("/finish/:id", updateItemController);

module.exports = orderRoutes;