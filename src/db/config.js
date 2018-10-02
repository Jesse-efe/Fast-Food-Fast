import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.connectionString,
  ssl: true,
});


export default pool;
