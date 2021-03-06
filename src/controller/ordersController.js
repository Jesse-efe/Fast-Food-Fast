// import orders from '../orders';
import pool from '../db/config';


class OrdersController {
  static getAllOrders(req, res) {
    pool.query('SELECT * FROM menu INNER JOIN orders ON menu.id = orders.menu_id', (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      return res.status(200).json(result.rows);
    });
  }

  static getAnOrder(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(404).json({ message: 'Invalid order Id' });
    }
    const query = {
      text: 'SELECT * FROM orders INNER JOIN menu ON orders.menu_id = menu.id WHERE orders.id = $1',
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
        return res.status(500).json({ message: 'there was an error please try later' });
      }
      return res.status(201).json({ message: 'Thanks, we have received your order' });
    });
  }

  static async updateOrderStatus(req, res) {
    let { id: orderId } = req.params;
    let { status } = req.body;
    orderId = parseInt(orderId);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: 'Invalid order Id' });
    }
    if (status === undefined) {
      return res.status(400).json({ message: 'order status not specified' });
    }
    status = status.trim();
    if (status === '') {
      return res.status(400).json({ message: 'order status not specified' });
    }

    let query = {
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [orderId],
    };
    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(404).json({ message: 'Invalid order Id' });
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
      return res.status(400).json({ message: 'Invalid order status' });
    }
  }

  static getUserOrders(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user Id' });
    }
    if (req.userData.id !== id) {
      return res.status(401).json({ message: 'Auth failed' });
    }

    const query = {
      text: 'SELECT * FROM orders INNER JOIN menu ON orders.menu_id = menu.id WHERE customer_id = $1',
      values: [id],
    };

    pool.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({ message: 'You have not ordered anything yet' });
      }
      return res.status(200).json(result.rows);
    });
  }
}

export default OrdersController;
