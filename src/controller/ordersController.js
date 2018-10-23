import orders from '../orders';
import pool from '../db/config';


class OrdersController {
  static getAllOrders(req, res) {
    pool.query('SELECT * FROM orders', (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
    return res.status(200).json(result.rows);
    });
  }

  static getLastOrder(req, res) {
    const ids = Object.keys(orders);
    const lastId = parseInt(ids.pop());
    return res.status(200).json(orders[lastId]);
  }

  static getAnOrder(req, res) {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).json({ message: 'Invalid order Id' });
    }
    return res.status(200).json(orders[orderId]);
  }

  static postAnOrder(req, res) {
    let { customer_id: customerId, menu_id: menuId, quantity: units } = req.body;
    customerId = customerId.trim();
    menuId = menuId.trim();
    units = units.trim();

    if (customerId === '' || customerId === null) {
      return res.status(400).json({ message: 'customer ID is required' });
    }
    if (menuId === '' || menuId === null) {
      return res.status(400).json({ message: 'please specify the item you want' });
    }
    if (units === '' || units === null) {
      return res.status(400).json({ message: 'please specify the quantity' });
    }
    const now = new Date();
    const date = now.toLocaleDateString();

    pool.query('INSERT INTO orders (customer_id, menu_id, status, quantity, date) VALUES ($1, $2, $3, $4, $5)', [customerId, menuId, 'New', units, date], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'there was an error please try later' });
      } else {
        res.status(201).json({ message: 'Thanks, we have received your order' });
      }
      // pool.end();
    });
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
