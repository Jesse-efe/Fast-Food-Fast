import  orders  from '../orders.js';

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
      return res.status(404).json({ message: 'Invalid order Id' });
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
    return res.status(201).json({ message: 'Your arder was received' });
  }

  static updateOrderStatus(req, res) {
    const { params: { id: orderId } } = req;
    orders[orderId].orderStatus = 'accepted';
    return res.status(200).json({ message: 'Order status has been updated' });
  }

  static deleteAnOrder(req, res) {
    const { params: { id: orderId } } = req;
    delete orders.orderId;
    return res.status(204).json({ message: 'Order has been deleted' });
  }
}


export default OrdersController;
