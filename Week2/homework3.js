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
    const AUTHORS_AND_MENTORS = `
    SELECT first.author_name as author, second.author_name as mentor 
    FROM authors as first
    INNER JOIN authors as second
    on second.author_no = first.mentor
    order by mentor;`;
    
    const AUTHORS_AND_PAPERS = `
    SELECT author_name, papers.paper_title
    from authors as a
    left join research_papers_authors as joint
    on a.author_no = joint.author_id
    left join research_papers as papers
    on joint.paper_id = papers.paper_id;`;

  connection.connect();

  execQuery(AUTHORS_AND_MENTORS);
  execQuery(AUTHORS_AND_PAPERS);

  connection.end();
}

seedDatabase();




