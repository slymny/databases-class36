const mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
};

const connection = mysql.createConnection(config);

const queries = [
  'CREATE DATABASE IF NOT EXISTS meetup;',
  'USE meetup;',
  'CREATE TABLE IF NOT EXISTS Invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50));',
  'CREATE TABLE IF NOT EXISTS Room (room_no INT, room_name VARCHAR(50), floor_number INT);',
  'CREATE TABLE IF NOT EXISTS Meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME, room_no INT);',

  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) 
      VALUES   
        (107, 'Micheal', 'Jim'),
        (108, 'Dwide', 'Jim'),
        (109, 'Pam', 'Kevin'),
        (110, 'Kevin', 'Dwide'),
        (111, 'Tony', 'Pam')`,

  `INSERT INTO Room (room_no, room_name, floor_number) 
      VALUES 
        (11, 'Small Room', 1),
        (12, 'Big Room', 1),
        (13, 'King Room', 1),
        (141, 'Queen Room', 1),
        (15, 'Huge Room', 1);`,

  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
        VALUES 
          (11, 'Personal Development', '2022-05-03 10:30:00', '2022-05-03 12:00:00', 11),
          (12, 'Prevent Wasting in Office', '2022-05-04 16:00:00', '2022-05-04 17:30:00', 12),
          (13, 'Career Path', '2022-05-05 11:00:00', '2022-05-05 14:00:00', 13),
          (14, 'How to Manage?', '2022-05-06 15:00:00', '2022-05-06 17:00:00', 141),
          (15, 'Find Yourself', '2022-05-07 13:00:00', '2022-05-07 14:00:00', 15);`,
];

const createInsert = query => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.log('the reply is ', results);
  });
};

connection.connect();

queries.forEach(q => createInsert(q));
connection.end();
