/* MY ATTEMPT

SELECT teachers.name AS teacher, students.name AS student, assignments.name AS assignment, assignment_submissions.duration AS duration
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN assignments ON assignments.id = assignment_id
JOIN assignment_submissions ON assignment_submissions.student_id = students.id;
GROUP BY student
ORDER by duration;  */

SELECT teachers.name as teacher, students.name as student, assignments.name as assignment, (completed_at-started_at) as duration
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN assignments ON assignments.id = assignment_id
ORDER BY duration;