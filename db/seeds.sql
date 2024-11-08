-- Add a department
INSERT INTO department (name) VALUES
	('Information Technology'),
	('Human Resources'),
	('Exceutive');

-- Add a role
INSERT INTO role (title, salary, department_id) VALUES
	('IT Manager', 240000, 1), 
	('Senior Software Engineer', 200000, 1),
	('HR Manager', 125000, 2),
	('HR Director', 105000, 2),
	('Cheif Executive Officer', 220000, 3),
	('Cheif Operations Officer', 175000, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
	('Gandalf', 'TheWhite', 1, null),
	('Frodo', 'Baggins', 2, 1),
	('Samwise', 'Gamgee', 3, null),
	('Merry', 'Brandybuck', 4, 3),
	('Pippin', 'Took', 5, null), 
	('Aragorn', 'Elessar', 6, 5);