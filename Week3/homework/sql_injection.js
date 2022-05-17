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


function getPopulation(name, code, cb) {
  // solution with question mark syntax
//   conn.query(
//     `SELECT Population FROM Country WHERE Name = ? and code = ?`,
//     [name, code],
//     function (err, result) {
//       if (err) cb(err);
//       if (result.length == 0) cb(new Error('Not found'));
//       cb(null, result);
//     },
//   );

// solution with escape method
  conn.query(
    `SELECT Population FROM Country WHERE Name = ` +
      conn.escape(name) +
      ` and code = ` +
      conn.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      cb(null, result);
    },
  );
}

getPopulation('Armenia', 'ARM', (err, res) => console.log(res));