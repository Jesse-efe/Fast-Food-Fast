import pool from '../db/config';

class Users {
  static signUserUp(req, res) {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name === '' || name === undefined) {
      res.status(400).json({ message: 'please fill in your name' });
      return;
    }
    if (email === '' || email === undefined) {
      res.status(400).json({ message: 'please fill in an email address' });
      return;
    }
    if (password === '' || password === undefined) {
      res.status(400).json({ message: 'please choose a password' });
      return;
    }

    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'there was an error...please try later' });
        return;
      }
      if (result.rowCount !== 0) {
        res.status(400).json({ message: 'You are already a rigistered user please signin' });
        return;
      }

      pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (err, result) => {
        if (err) {
          res.status(500).json({ message: 'there was an error please try later' });
        } else {
          res.status(200).json({ message: 'created successfully' });
        }
        // pool.end();
      });
    });
  }

  static signUserIn(req, res) {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email === '' || email === undefined) {
      res.status(400).json({ message: 'please fill in an email address' });
      return;
    }
    if (password === '' || password === undefined) {
      res.status(400).json({ message: 'please fill in your password' });
      return;
    }

    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.log(err, result);
        res.status(500).json({ message: 'there was an error...please try later' });
        return;
      }
      if (result.rowCount !== 1) {
        res.status(400).json({ message: 'You are not a rigistered user please signup' });
        return;
      }
      if (Users.notCorrectPass(result.rows[0].password, password)) {
        res.status(400).json({ message: 'Email and password do not match' });
        return;
      }
      const msg = `Welcome back ${result.rows[0].name} you have signed in successfully`;
      res.status(200).json({ message: msg });
      // pool.end();
    });
  }

  static notCorrectPass(truePwd, givenPwd) {
    if (truePwd !== givenPwd) {
      return true;
    }
    return false;
  }

  static findUserByEmail(email, res) {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      // console.log(err, result);
      if (err) {
        res.json({ message: 'there was an error...please try later' });
      } else {
        return result;
      }
    });
  }
}

export default Users;
