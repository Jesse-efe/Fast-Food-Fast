import pool from '../db/config';

class Users {
  static async signUserUp(req, res) {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name === '' || typeof (name) !== 'string') {
      return res.status(400).json({ message: 'please fill in your name' });
    }
    if (email === '' || typeof (email) !== 'string') {
      return res.status(400).json({ message: 'please fill in an email address' });
    }
    if (password === '' || password === null) {
      return res.status(400).json({ message: 'please choose a password' });
    }

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
      console.log(err);
      return res.status(500).json({ message: 'there was an error...please try later' });
    }
    
    // pool.query(query, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).json({ message: 'there was an error...please try later' });
    //     return;
    //   }
    //   if (result.rowCount !== 0) {
    //     res.status(400).json({ message: 'You are already a rigistered user please signin' });
    //     return;
    //   }

    //   pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (err, result) => {
    //     if (err) {
    //       res.status(500).json({ message: 'there was an error please try later' });
    //     } else {
    //       res.status(201).json({ message: 'created successfully' });
    //     }
    //     // pool.end();
    //   });
    // });
  }

  static async logUserIn(req, res) {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email === '' || email === undefined) {
      return res.status(400).json({ message: 'please fill in an email address' });
    }
    if (password === '' || password === undefined) {
      return res.status(400).json({ message: 'please fill in your password' });
    }

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
    // pool.query(query, (err, result) => {
    //   if (err) {
    //     return res.status(500).json({ message: 'there was an error...please try later' });
    //   }
    //   if (result.rowCount !== 1) {
    //     return res.status(400).json({ message: 'You are not a rigistered user please signup' });
       
    //   }
    //   if (Users.notCorrectPass(result.rows[0].password, password)) {
    //     return res.status(400).json({ message: 'Email and password do not match' });
    //   }
    //   const msg = `Welcome back ${result.rows[0].name} you have signed in successfully`;
    //   return res.status(200).json({ message: msg });
    //   // pool.end();
    // });
  }

  static getOrderHistory(req,res) {
    let { id } = req.params;
    
    const query = {
      text: 'SELECT * FROM orders WHERE customer_id = $1',
      values: [id],
    };

    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'there was an error...please try later' });
      }
      if (result.rowCount < 1) {
        return res.status(400).json({ message: 'You have not ordered anything yet' });
      }
      return res.send(result.rows);
    });
  }
  
  static notCorrectPass(truePwd, givenPwd) {
    if (truePwd !== givenPwd) {
      return true;
    }
    return false;
  }

}

export default Users;
