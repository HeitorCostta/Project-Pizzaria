const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createOrder(data) {
  return await prisma.order.create({
    data: {
      table: data.table,
      status: data.status,
      draft: data.draft,
      name: data.name,
      clientId: data.clientId,
    },
  });
}
async function getOrders() {
  return await prisma.order.findMany({});
}

async function addItem(data) {
  return await prisma.orderItem.create({
    data: {
      amount: data.amount,
      orderId: data.orderId,
      productId: data.productId,
    },
  });
}

async function removeItem(orderItemID) {
  return await prisma.orderItem.delete({
    where: {
      id: orderItemID,
    },
  });
}

async function finishOrder(orderId) {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "concluido",
      draft: false,
    },
  });
}

async function getOrderDetails(orderId) {
  // 1. Buscamos o pedido no banco com todos os relacionamentos necessários
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true, // Aqui trazemos o preço, nome, etc., de cada produto do item
        },
      },
    },
  });

  // Se o pedido não existir, retornamos nulo para o controller tratar
  if (!order) return null;

  // 2. A MÁGICA DA MATEMÁTICA: Calculamos o valor total usando o reduce do JavaScript
  // Percorremos cada item faturado, multiplicando a quantidade (amount) pelo preço (price) do produto
  const total = order.items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.product.price) || 0;
    return sum + item.amount * itemPrice;
  }, 0);

  // 3. Devolvemos o objeto do pedido original já com o campo "total" embutido nele
  return {
    ...order,
    total: parseFloat(total.toFixed(2)), // Deixa o valor com apenas 2 casas decimais (Ex: 105.90)
  };
}

module.exports = {
  createOrder,
  getOrders,
  addItem,
  removeItem,
  finishOrder,
  getOrderDetails,
};
