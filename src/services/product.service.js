const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getProducts() {
  return await prisma.product.findMany();
}

module.exports = { getProducts };
