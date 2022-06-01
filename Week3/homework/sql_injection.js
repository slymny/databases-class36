const mysql = require('mysql');

// Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

// Connect
conn.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Database connected...');
});

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

// Example for the taking advantage of SQL-injection with the old version of the code
getPopulation('"Country" OR 1=1', '"ABC" OR 1=1', cb);
