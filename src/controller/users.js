import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/config';

class Users {
  static async signUserUp(req, res) {
    const { name, email, password } = req.body;
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    try {
      const result = await pool.query(query);
      if (result.rowCount !== 0) {
        return res.status(400).json({ message: 'You are already a rigistered user please signin' });
      }
      const hash = await bcrypt.hash(password, 5);
      await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash]);
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
        return res.status(401).json({ message: 'You are not a rigistered user please signup' });
      }
      const isCorrectPwd = await bcrypt.compare(password, result.rows[0].password);
      let message;
      let secretKey;
      if (isCorrectPwd) {
        message = `Welcome back ${result.rows[0].name} you have signed in successfully`;
      } else {
        return res.status(401).json({ message: 'Auth failed' });
      }
      if (result.rows[0].isadmin) {
        secretKey = process.env.adminSecretKey;
      } else {
        secretKey = process.env.userSecretKey;
      }
      const token = jwt.sign(
        {
          email,
          id: result.rows[0].id,
        }, secretKey, { expiresIn: 60 * 60 },
      );
      return res.status(200).json({ message, token });
    } catch (err) {
      return res.status(500).json({ message: 'there was an error...please try later' });
    }
  }

  static notCorrectPass(truePwd, givenPwd) {
    bcrypt.compare(givenPwd, truePwd, (err, res) => {
      if (!res) {
        return true;
      }
      return false;
    });
  }
}

export default Users;
