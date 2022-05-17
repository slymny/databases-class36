const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_ACCOUNT_TABLE = `
CREATE TABLE IF NOT EXISTS accounts (
    account_number INT NOT NULL, 
    balance INT, 
    PRIMARY KEY(account_number));`;

  const CREATE_ACCOUNT_CHANGES_TABLE = `
CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT NOT NULL AUTO_INCREMENT, 
    account_number INT, 
    amount INT, 
    changed_date DATE, 
    remark VARCHAR(200),
    PRIMARY KEY (change_number), 
    FOREIGN KEY (account_number) REFERENCES accounts(account_number));`;

  connection.connect();

  try {
    await execQuery(CREATE_ACCOUNT_TABLE);
    await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
