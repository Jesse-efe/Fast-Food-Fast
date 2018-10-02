import { Pool } from 'pg';

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.devConnectionString,
});


export default pool;
