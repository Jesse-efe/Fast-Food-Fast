import pool from './config.js';

const seedDb = () => {
    let sql = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE IF NOT EXISTS users
    (
       id SERIAL,
       name VARCHAR(50),
       email VARCHAR(50),
       password VARCHAR(50),
       PRIMARY KEY (ID)
    )`;
    pool.query(sql, (err, res) => {
        if(err) {
            console.log('failed creating users table');
            return false;
        }
    });
    
    sql = `DROP TABLE IF EXISTS orders CASCADE;
    CREATE TABLE IF NOT EXISTS orders
    (
       id SERIAL,
       customer_id INT,
       menu_id INT,
       status VARCHAR(50),
       quantity INT,
       date VARCHAR(18),
       PRIMARY KEY (ID)
    )`;
    pool.query(sql, (err, res) => {
        if(err) {
            console.log('failed creating orders table');
            return false;
        }
    });
    
    sql = `DROP TABLE IF EXISTS menu CASCADE;
    CREATE TABLE menu
    (
       id SERIAL,
       food VARCHAR(50),
       description VARCHAR(50),
       price NUMERIC,
       available VARCHAR(50),
       PRIMARY KEY (ID)
    )`;
    pool.query(sql, (err, res) => {
        if(err) {
            console.log('failed creating menu table');
        }
    });
}

export default seedDb;


