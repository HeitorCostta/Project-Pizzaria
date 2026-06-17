const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createClient(data) {
  return await prisma.client.create({
    data: {
      username: data.username,
      telephone: data.telephone,
    },
  });
}

async function findClientByTelephone(telephone) {
  return await prisma.client.findFirst({
    where: { telephone },
  });
}

module.exports = { createClient, findClientByTelephone };
