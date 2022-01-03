SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM students OUTER JOIN cohorts ON cohorts.id = cohort_id;