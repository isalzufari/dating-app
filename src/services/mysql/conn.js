const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

pool.getConnection(err => {
  if (err) {
    console.log(err);
  }
});

module.exports = pool;
