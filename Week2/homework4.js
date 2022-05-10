const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

const connection = mysql.createConnection(config);

const execQuery = query => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.table(results);
  });
};

function seedDatabase() {
  const AUTHOR_NUM_AND_TITLE = `
    SELECT paper.paper_title, COUNT(author_id) AS author_number
        FROM research_papers AS paper
        INNER JOIN research_papers_authors AS joint 
            ON paper.paper_id = joint.paper_id
        GROUP BY joint.paper_id
        ORDER BY paper_title;`;

  const FEMALE_AUTHORS_PAPERS_NUM = `
    SELECT gender, count(paper.paper_title) as number_of_paper
        FROM research_papers AS paper
        INNER JOIN research_papers_authors AS joint 
            ON paper.paper_id = joint.paper_id
        INNER JOIN authors
            ON authors.author_no = joint.author_id
        GROUP BY gender
            HAVING gender = 'f';`;

  const AVG_BY_UNIVERSITY = `
    SELECT university, AVG(h_index) as avg_h_index
        FROM authors
        GROUP BY university;`;

  const PAPERS_PER_UNIVERSITY = `
    WITH uni_papers AS (
        SELECT university, COUNT(paper_id) AS num
            FROM authors
                INNER JOIN research_papers_authors AS joint 
                ON author_no = author_id
                GROUP BY author_id , university
                ORDER BY university)
        SELECT university, SUM(num) as num_of_papers
            FROM uni_papers
            GROUP BY university;`;

  const MIN_AND_MAX_H_INDEX = `
    SELECT university, MIN(h_index) as min, MAX(h_index) as max
    FROM authors
    GROUP BY university;`;

  connection.connect();

  execQuery(AUTHOR_NUM_AND_TITLE);
  execQuery(FEMALE_AUTHORS_PAPERS_NUM);
  execQuery(AVG_BY_UNIVERSITY);
  execQuery(PAPERS_PER_UNIVERSITY);
  execQuery(MIN_AND_MAX_H_INDEX);

  connection.end();
}

seedDatabase();
