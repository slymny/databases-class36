const mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database : 'new_world'
};

const connection = mysql.createConnection(config);

const select_queries = [
    `SELECT Name FROM country WHERE Population > 8000000;`,
    `SELECT Name FROM country WHERE Name LIKE '%land%';`,
    `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;`,
    `SELECT Name FROM country WHERE Continent = 'Europe';`,
    `SELECT Name FROM country ORDER BY SurfaceArea DESC;`,
    `SELECT Name FROM city WHERE CountryCode = 'NLD';`,
    `SELECT Population FROM city WHERE Name = 'Rotterdam';`,
    `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
    `SELECT Name FROM city ORDER BY Population DESC LIMIT 10;`,
    `SELECT SUM(Population) FROM country;`,
]

const getQueries = query => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.log(JSON.stringify(results));
  });
};

connection.connect();

select_queries.forEach(q => getQueries(q));
connection.end();
