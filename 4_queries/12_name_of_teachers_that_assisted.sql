SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM students
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;