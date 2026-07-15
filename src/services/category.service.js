const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCategory(data) {
  return await prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

async function getCategories() {
  return await prisma.category.findMany();
}

module.exports = { createCategory, getCategories };
