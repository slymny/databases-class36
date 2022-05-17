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
  const INSERT_ACCOUNTS = `
    INSERT INTO accounts (account_number, balance)
        VALUES 
            (101, 10000),
            (102, 5000),
            (103, 267),
            (104, 6590),
            (105, 350);`;

  const INSERT_ACCOUNT_CHANGES = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark)
        VALUES
        (104, 740, '2022-10-10', "Going EFT"),
        (105, 740, '2022-10-10', "Coming EFT");`;

  connection.connect();

  try {
    await execQuery(INSERT_ACCOUNTS);
    await execQuery(INSERT_ACCOUNT_CHANGES);
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
