const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

/*
pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM students
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));
  */

//! Update students.js and teachers.js to use parameterized queries.


// In our applications, we will separate out our SQL into two different parts.
//~ 1. The part that we write as the developer, the part that we have complete control over.
//? 2. The part that comes from somewhere else and might be malicious.

//~ 1. The part that we write as the developer, the part that we have complete control over.

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM students
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`;

//? 2. The part that comes from somewhere else and might be malicious.
const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [cohortName];

//QUERY
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));

// EX. input: node teachers.js JUN04