const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createOrder(data){
    return await prisma.order.create({
        data:{
            table:data.table,
            status:data.status,
            draft: data.draft,
            name: data.name,
            clientId:data.clientId

        }
    });

}
async function getOrders(){
    return await prisma.order.findMany({
    })
}

async function addItem(data){
    return await prisma.orderItem.create({
        data: {
            amount: data.amount,
            orderId:data.orderId,
            productId:data.productId
        }
    })
}

async function removeItem(orderItemID){
    return await prisma.orderItem.delete({
        where:{
            id:orderItemID
        }
    });

}

async function finishOrder(orderId) {
  return await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: "concluido",
      draft: false         
    }
  });
}

module.exports  = { createOrder, getOrders, addItem, removeItem, finishOrder}