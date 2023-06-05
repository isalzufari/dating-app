const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db_ngedate',
});

pool.getConnection(err => {
  if (err) {
    console.log(err);
  }
});


module.exports = pool;
