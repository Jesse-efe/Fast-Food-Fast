import bcrypt from 'bcryptjs';
import pool from './config';

const seedDb = async () => {
  let sql = `DROP TABLE IF EXISTS users;
    CREATE TABLE IF NOT EXISTS users
    (
       id SERIAL,
       name VARCHAR(50),
       email VARCHAR(50),
       password VARCHAR(100),
       isAdmin BOOL DEFAULT '0',
       PRIMARY KEY (ID)
    )`;
  try {
    await pool.query(sql);
  } catch (err) {
    return false;
  }

  sql = `DROP TABLE IF EXISTS orders;
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
  try {
    await pool.query(sql);
  } catch (err) {
    return false;
  }

  sql = `DROP TABLE IF EXISTS menu;
    CREATE TABLE menu
    (
       id SERIAL,
       food VARCHAR(50),
       description VARCHAR(50),
       price NUMERIC,
       picture VARCHAR(550),
       PRIMARY KEY (ID)
    )`;
  try {
    const hash = await bcrypt.hash('adminpass', 5);
    await pool.query(sql);
    await pool.query('INSERT INTO users (name, email, password, isAdmin) VALUES ($1, $2, $3, $4)', ['admin', 'email@admin.com', hash, '1']);
    return true;
  } catch (err) {
    return false;
  }
};

export default seedDb;
