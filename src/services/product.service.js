const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Função que já existia para listar
async function getProducts() {
  return await prisma.product.findMany();
}

async function createProducts(data) {
  return await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      banner: data.banner,
      categoryId: data.categoryId, // Amarração com a categoria!
    },
  });
}

async function getProductsByCategory(categoryId) {
  return await prisma.product.findMany({
    where: {
      categoryId: categoryId,
    },
  });
}

module.exports = { getProducts, createProducts, getProductsByCategory };
