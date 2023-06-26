const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.getConnection(err => {
  if (err) {
    console.log(err);
  }
});

module.exports = pool;
