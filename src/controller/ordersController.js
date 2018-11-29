// import orders from '../orders';
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
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Invalid order Id' });
    }
    const query = {
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [id],
    };
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      if (result.rowCount !== 1) {
        return res.status(404).json({ message: 'Invalid order Id' });
      }
      return res.status(200).json(result.rows[0]);
    });
  }

  static postAnOrder(req, res) {
    const { customerId, menuId, units } = req.body;
    const now = new Date();
    const date = now.toLocaleDateString();

    const query = {
      text: 'INSERT INTO orders (customer_id, menu_id, status, quantity, date) VALUES ($1, $2, $3, $4, $5)',
      values: [customerId, menuId, 'New', units, date],
    };
    pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'there was an error please try later' });
      } else {
        res.status(201).json({ message: 'Thanks, we have received your order' });
      }
    });
  }

  static async updateOrderStatus(req, res) {
    let { id: orderId } = req.params;
    const { status } = req.body;
    orderId = parseInt(orderId);
    if (isNaN(orderId)) {
      return res.status(404).json({ message: 'Invalid order Id' });
    }

    let query = {
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [orderId],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(400).json({ message: 'Invalid order Id' });
      }
      if (result.rows[0].status === 'completed' || result.rows[0].status === 'cancelled') {
        return res.status(400).json({ message: 'Order status cannot be updated further' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'there was an error...please try later' });
    }

    if (status === 'processing' || status === 'completed' || status === 'cancelled') {
      query = {
        text: 'UPDATE orders SET status = $1 WHERE id = $2',
        values: [status, orderId],
      };
      pool.query(query, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'there was an error...please try later' });
        }
        return res.status(200).json({ message: 'Order status updated sucessfully' });
      });
    } else {
      return res.status(404).json({ message: 'Invalid order status' });
    }
  }

  static getUserOrders(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Invalid user Id' });
    }

    const query = {
      text: 'SELECT * FROM orders WHERE customer_id = $1',
      values: [id],
    };

    pool.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      if (result.rowCount < 1) {
        return res.status(400).json({ message: 'You have not ordered anything yet' });
      }
      return res.send(result.rows);
    });
  }
}

export default OrdersController;
