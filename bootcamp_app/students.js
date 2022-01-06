const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

/*
pool.query is a function that accepts an SQL query as a JavaScript string.
Using the ` (backtick), we can write a multi line string like this to make our SQL look nicer.
The function then returns a promise that contains our result when the query is successful.
*/

// The result is just an array of JavaScript objects

/*
pool.query(`
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));
*/

/*
pool.query(`
  SELECT id, name, cohort_id
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  LIMIT 5;
  `)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
    });
  });
  */

/* Let's make our application a little bit more dynamic.
We will allow a user to specify a cohort name and the limit.
So someone should be able to run the application with the following command:
*/

// EX: node students.js JU 6
// Gives 6 students from cohort JUN04

/*
pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  }).catch(err => console.error('query error', err.stack));
*/

//! Update students.js and teachers.js to use parameterized queries.
//pool.query(queryString, values);

// In our applications, we will separate out our SQL into two different parts.
//~ 1. The part that we write as the developer, the part that we have complete control over.
//? 2. The part that comes from somewhere else and might be malicious.

//~ 1. The part that we write as the developer, the part that we have complete control over.
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

//? 2. The part that comes from somewhere else and might be malicious.
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

//QUERY
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  }).catch(err => console.error('query error', err.stack));