const mysql = require('mysql2');

const connection = mysql.createConnection({
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: '20010223',
   database: "Express"
});

module.exports = connection;