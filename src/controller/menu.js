import pool from '../db/config';

class Menu {
  static getMenu(req, res) {
    pool.query('SELECT * FROM menu', (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      console.log(result.rows);
      return res.status(200).json(result.rows);
    });
  }

  static insertMenu(req, res) {
    const {
      title, description, price, picture,
    } = req.body;

    const query = {
      text: 'INSERT INTO menu (food, description, price, picture) VALUES ($1, $2, $3, $4)',
      values: [title, description, price, picture],
    };
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'there was an error please try later' });
      }
      return res.status(201).json({ message: 'Item was sucessfully added to the menu' });
    });
  }
}

export default Menu;
