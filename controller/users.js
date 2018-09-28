import { pool } from '../db/config.js';

class User {
    static signUserUp(req, res) {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let pwd = req.body.password;

        let sql = `INSERT INTO users VALUES ("${name}", "${email}", "${pwd}")`;
        pool.query(sql, (err, res) => {
            console.log('yes yes ys');
            console.log(err, res);
            pool.end(); 
        });
    }

    static findAllUser(req, res) {
        let sql = 'SELECT * FROM users';
        pool.query(sql, (err, res) => {
            console.log(err, res);
            pool.end();
        })
    }

    static findUser(req, res) {
        let email = req.params.email;
        let sql = 'SELECT * FROM users WHERE email =' + email;
        pool.query(sql, (err, res) => {
            console.log(err, res);
            pool.end();
        })
    }
}

export { User };