const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCategory(data) {
  return await prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

module.exports = { createCategory };
