import { pool } from '../db/config.js';

class User {
  static signUserUp(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const pwd = req.body.password;

    const sql = `INSERT INTO users VALUES ("${name}", "${email}", "${pwd}")`;
    pool.query(sql, (err, res) => {
      console.log('yes yes ys');
      console.log(err, res);
      pool.end();
    });
  }

  static findAllUser(req, res) {
    const sql = 'SELECT * FROM users';
    pool.query(sql, (err, res) => {
      console.log(err, res);
      pool.end();
    });
  }

  static findUser(req, res) {
    const email = req.params.email;
    const sql = `SELECT * FROM users WHERE email =${  email}`;
    pool.query(sql, (err, res) => {
      console.log(err, res);
      pool.end();
    });
  }
}

export default User;
