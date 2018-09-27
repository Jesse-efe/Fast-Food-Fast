const orders = require('../orders.js');

class OrdersController {
  static getAllOrders(req, res) {
    return res.status(200).json(orders);
  }

  static getLastOrder(req, res) {
    const ids = Object.keys(orders);
    const lastId = parseInt(ids.pop());
    return res.status(200).json(orders[lastId]);
  }

  static getAnOrder(req, res) {
    const { params: { id: orderId } } = req;
    if (orders[orderId] === undefined) {
      return res.status(404).send('Invalid order Id');
    }
    return res.status(200).json(orders[orderId]);
  }

  static postAnOrder(req, res) {
    const ids = Object.keys(orders);
    const lastId = parseInt(ids.pop());
    const newId = lastId + 1;
    orders[newId] = {
      customerName: req.body.name,
      foodOrdered: req.body.food,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.price * req.body.quantity,
      orderStatus: 'unresolved',
    };
    return res.status(201).send('Your arder was received');
  }

  static updateOrderStatus(req, res) {
    const { params: { id: orderId } } = req;
    orders[orderId].orderStatus = 'accepted';
    return res.status(200).send('Order status has been updated');
  }

  static deleteAnOrder(req, res) {
    const { params: { id: orderId } } = req;
    delete orders.orderId;
    return res.status(204).send('Order has been deleted');
  }
}


module.exports = OrdersController;
