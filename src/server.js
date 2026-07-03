const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/product.routes");
const clientRoutes = require("./routes/client.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require ("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/products", productRoutes);
app.use("/clients", clientRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes)

app.get("/", (req, res) => {
  res.json({ message: "API Pizza Running 🍕" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
