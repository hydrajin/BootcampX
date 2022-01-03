SELECT students.name as student_name, email, cohorts.name as cohort_name
FROM cohorts RIGHT JOIN students ON cohorts.id = cohort_id;