const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.connectionString,
    ssl: true,
});




module.exports = pool;