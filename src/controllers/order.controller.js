const {
    createOrder, getOrders, addItem, removeItem, finishOrder
} = require("../services/order.service");

async function createOrderController(req, res) {
  try {
    // 1. Pegamos apenas o que vem do corpo (sem req.params)
    const { table, status, draft, name, clientId } = req.body;

    // 2. A única validação de bloqueio real: precisa saber a mesa!
    if (!table) {
      return res.status(400).json({
        error: "Bad Request",
        message: "O campo 'table' (número da mesa) é obrigatório.",
      });
    }

    // 3. Chama o service passando os dados (o seu service recebe apenas 1 argumento: o objeto data)
    const order = await createOrder({
      table,
      status,
      draft,
      name,
      clientId,
    });

    // 4. Retorna o status correto de criação (201 Created)
    return res.status(201).json({
      order,
      message: "Pedido/Mesa aberto com sucesso! 📝",
    });

  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Erro ao abrir a mesa.",
    });
  }
}

async function getOrderController(req, res){
  try {
    const orders = await getOrders()
    
    if(!orders){
      return res.status(404).json({ 
        error: "Not Found",
        message: "Pedidos não encontrados"
      })
    } 
    
  
    return res.status(200).json({ orders, message: "Pedidos Encontrados" })
    
  } catch(error) {
    console.error("Erro ao Buscar Pedidos", error)
    return res.status(500).json({
      error: "Internal Server Error",
      message: "erro ao buscar pedidos"
    })
  }
}


async function addItemController(req, res) {
  try{
    const {amount, orderId ,productId} = req.body
    if(!amount || !orderId || !productId){
      return res.status(400).json({error:" Bad Request",
                                  message: "É obrigatório o preenchimento dos campos"
      })
    }
  
    const item = await addItem({ amount, orderId, productId });

    return res.status(201).json({
      item,
      message: "Item adicionado ao pedido com sucesso! 🍕"
    });

  } catch (error) {
    console.error("Erro ao adicionar item:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Erro ao adicionar o item ao pedido."
    });
  }
  }

async function removeItemController(req, res){
  try {
    const { id } = req.params;
    
    if(!id){
      return res.status(400).json({
        error: "Bad Request",
        message: "Id Inválido"
      });
    }
    
    const itemID = await removeItem(id);
    
    return res.status(200).json({
      itemID,
      message: "Item deletado com sucesso "
    });
    
  } catch(error) {
    console.error("Erro ao Deletar Item", error);
    return res.status(500).json({
      error: "Internal Server Error", 
      message: "Erro ao remover Item"
    });
  }
}

async function updateItemController(req, res) {
  try {
    const { id } = req.params;
    const { status, draft } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Id inválido ou não fornecido."
      });
    }

    // Chama o service correto passando o ID para atualizar no banco
    const updatedOrder = await finishOrder(id);

    // Retorna o resultado final e responde o Postman
    return res.status(200).json({
      order: updatedOrder,
      message: "Pedido atualizado/concluído com sucesso! 🏁"
    });

  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return res.status(500).json({
      error: "Internal Server Error", 
      message: "Erro ao atualizar o pedido."
    });
  }
}


module.exports = {createOrderController, getOrderController, addItemController, removeItemController, updateItemController}