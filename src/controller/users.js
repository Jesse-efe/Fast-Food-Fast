import pool from '../db/config';

class Users {
  static async signUserUp(req, res) {
    const { name, email, password } = req.body;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    try {
      let result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({ message: 'You are already a rigistered user please signin' });
      }

      result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
      return res.status(201).json({ message: 'created successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'there was an error...please try later' });
    }
  }

  static async logUserIn(req, res) {
    const { email, password } = req.body;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    try {
      const result = await pool.query(query);
      if (result.rowCount !== 1) {
        return res.status(400).json({ message: 'You are not a rigistered user please signup' });
      }
      if (Users.notCorrectPass(result.rows[0].password, password)) {
        return res.status(400).json({ message: 'Email and password do not match' });
      }
      const msg = `Welcome back ${result.rows[0].name} you have signed in successfully`;
      return res.status(200).json({ message: msg });
    } catch (err) {
      return res.status(500).json({ message: 'there was an error...please try later' });
    }
  }

  static notCorrectPass(truePwd, givenPwd) {
    if (truePwd !== givenPwd) {
      return true;
    }
    return false;
  }
}

export default Users;
