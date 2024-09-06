-- Add a department
INSERT INTO department (name) VALUES ('New Department Name');

-- Add a role
INSERT INTO role (title, salary, department_id) 
VALUES ('New Role Title', 50000.00, (SELECT id FROM department WHERE name = 'Department Name'));

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 
        (SELECT id FROM role WHERE title = 'Role Title'), 
        (SELECT id FROM employee WHERE first_name = 'ManagerFirstName' AND last_name = 'ManagerLastName'));

-- Update an employee role
UPDATE employee 
SET role_id = (SELECT id FROM role WHERE title = 'New Role Title')
WHERE id = (SELECT id FROM employee WHERE first_name = 'EmployeeFirstName' AND last_name = 'EmployeeLastName');

-- Note: The above INSERT and UPDATE statements would typically be parameterized in actual code to prevent SQL injection.

-- Bonus functionalities (npm not in original requirements but useful):

-- Update employee managers
UPDATE employee 
SET manager_id = (SELECT id FROM employee WHERE first_name = 'NewManagerFirstName' AND last_name = 'NewManagerLastName')
WHERE id = (SELECT id FROM employee WHERE first_name = 'EmployeeFirstName' AND last_name = 'EmployeeLastName');

-- View employees by manager
SELECT e.* 
FROM employee e
WHERE e.manager_id = (SELECT id FROM employee WHERE first_name = 'ManagerFirstName' AND)