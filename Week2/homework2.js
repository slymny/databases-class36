const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = query => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.table(results);
  });
};

function seedDatabase() {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers (
        paper_id int not null AUTO_INCREMENT, 
        paper_title varchar(200), 
        published_on varchar(200),
        publish_year year,
        constraint primary key(paper_id)
    );`;

  const PAPERS_TO_INSERT = `
    INSERT INTO research_papers (paper_title, published_on, publish_year)
        VALUES 
        ('Literature and Religion for the Humanities','Religion & Literature, Vol. 46, No. 2/3', 2014),
        ('The Multilingual Local in World Literature', 'Comparative Literature, Vol. 67, No. 4', 2015),
        ('Interplanetary Literature', 'Comparative Literature, Vol. 63, No. 4', 2011),
        ('Literature of the Hour and the Literature of All Time', 'Indian Literature, Vol. 55, No. 2 (262)', 2011),
        ('Haitian Literature as a Model for World Literature', 'World Literature Today, Vol. 89, No. 2', 2015),
        ('Seeking the Light through Literature', 'World Literature Today, Vol. 91, No. 6', 2017),
        ('Dubravka Ugrešić and Contemporary European Literature', 'World Literature Today, Vol. 91, No. 1', 2017),
        ('Introduction: Comparative Literature in East Asia', 'Comparative Literature Studies, Vol. 54, No. 1', 2017),
        ('Suspicion and Settler Literature', 'Journal of New Zealand Literature (JNZL), No. 37.1', 2019),
        ('Book Reviews', 'International Journal of Persian Literature, Vol. 1, No. 1', 2016),
        ('Introduction: Chinese Worlds of World Literature', 'Modern Chinese Literature and Culture, Vol. 30, No. 1', 2018),
        ('Teaching Law and Literature', 'Law and Literature, Vol. 26, No. 2', 2014),
        ("Divisions of Labor: Between Cheah's Worlds", 'Qui Parle, Vol. 25, No. 1-2', 2016),
        ('Introduction: Embargoed Literature: Arabic', 'College Literature, Vol. 37, No. 1', 2010),
        ('Is American Literature Parochial?', 'World Literature Today, Vol. 87, No. 4', 2013),
        ('Religion, Literature, and Method', 'Early American Literature, Vol. 45, No. 1', 2010),
        ('To Make a Literature Black', 'Early American Literature, Vol. 50, No. 3', 2015),
        ('Arab Literature: Politics and Nothing But?', 'World Literature Today, Vol. 90, No. 1', 2016),
        ("Conflict Management: Jeremy Belknap's Committed Literature", 'Early American Literature, Vol. 50, No. 2', 2015),
        ("Beyond National Allegory: Mo Yan's Fiction as World Literature", 'Modern Chinese Literature and Culture, Vol. 30, No. 1', 2018),
        ('Corporate transparency: Overview of issues and literature review', 'Transparency International', 2019),
        ('Did Katherine Mansfield read New Zealand literature?', 'Journal of New Zealand Literature (JNZL), No. 37.1', 2019),
        ('Shaping Indian Literature', 'Indian Literature, Vol. 51, No. 6', 2007),
        ('Literature as De-colonization', 'Indian Literature, Vol. 53, No. 1', 2009),
        ('Aspects of Translation in Jain Canonical Literature', 'Indian Literature, Vol. 57, No. 3', 2013),
        ('Literature Ireland', 'Books Ireland, No. 387', 2019),
        ('Biocultural Theory and the Study of Literature', 'Comparative Literature, Vol. 67, No. 1', 2015),
        ('Japanese Literature, or J-Literature in the 1990s', 'World Literature Today, Vol. 77, No. 1', 2003),
        ('Something Else: The Politics of Early American Literature', 'Early American Literature, Vol. 51, No. 2', 2016),
        ('Paganism and Literature', 'Christianity and Literature, Vol. 56, No. 4', 2007),
        ('Comparative Literature versus World Literature', 'The Comparatist, Vol. 34', 2010)
        ;`;

  const CREATE_RESEARCH_PAPERS_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers_authors (
        paper_id int not null,
        author_id int not null,
        constraint fk_author_id foreign key (author_id) references authors(author_no),
        constraint fk_paper_id foreign key (paper_id) references research_papers(paper_id)
    );`;

  const INSERT_INTO_JOINT_TABLE = `
    INSERT INTO research_papers_authors
        VALUES
            (1, 1),
            (1, 2),
            (1, 5),
            (2, 1),
            (3, 4),
            (4, 5),
            (5, 4),
            (6, 3),
            (7, 8),
            (8, 10),
            (9, 6),
            (10, 15),
            (11, 14),
            (12, 9),
            (13, 2),
            (14, 5),
            (15, 8),
            (16, 7),
            (17, 12),
            (18, 4),
            (19, 15),
            (19, 3),
            (20, 13),
            (21, 10),
            (21, 6),
            (22, 4),
            (23, 9),
            (24, 11),
            (25, 8),
            (26, 13),
            (27, 5),
            (27, 8),
            (28, 14),
            (29, 12),
            (30, 4)
    ;`;

  connection.connect();

  execQuery(CREATE_RESEARCH_PAPERS_TABLE);
  execQuery(PAPERS_TO_INSERT);
  execQuery(CREATE_RESEARCH_PAPERS_AUTHORS_TABLE);
  execQuery(INSERT_INTO_JOINT_TABLE);
  
  connection.end();
}

seedDatabase();
