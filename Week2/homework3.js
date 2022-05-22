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
    SELECT A1.author_name as author, A2.author_name as mentor 
    FROM authors as A1
    INNER JOIN authors as A2
    on A2.author_no = A1.mentor
    order by mentor;`;
    
    const AUTHORS_AND_PAPERS = `
    SELECT author_name, papers.paper_title
    from authors as a
    left join research_papers_authors as joint
    on a.author_no = joint.author_id
    left join research_papers as papers
    on joint.paper_id = papers.paper_id;`;
    
    // As you can see the output below this query already brings the paperless authors.
// | (index) │         author_name         │                            paper_title                             │
// ├─────────┼─────────────────────────────┼────────────────────────────────────────────────────────────────────┤
// │    0    │     'Francesca Orsini'      │                                null                                │
// │    1    │        'Haun Saussy'        │            'Literature and Religion for the Humanities'            │
// │    2    │        'Haun Saussy'        │            "Divisions of Labor: Between Cheah's Worlds"            |


  connection.connect();

  execQuery(AUTHORS_AND_MENTORS);
  execQuery(AUTHORS_AND_PAPERS);

  connection.end();
}

seedDatabase();




