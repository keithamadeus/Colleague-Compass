-- Initialize the database
-- CREATE DATABASE employee_tracker;

-- Drop tables if they exist
DROP DATABASE IF EXISTS employee_tracker;

-- Use the database
-- USE employee_tracker;

-- Create tables
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Operations based on user choices:

-- View all departments
SELECT id, name FROM department;

-- View all roles
SELECT r.id, r.title, d.name AS department, r.salary 
FROM role r
JOIN department d ON r.department_id = d.id;

-- View all employees
SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

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

-- Bonus functionalities (not in original requirements but useful):

-- Update employee managers
UPDATE employee 
SET manager_id = (SELECT id FROM employee WHERE first_name = 'NewManagerFirstName' AND last_name = 'NewManagerLastName')
WHERE id = (SELECT id FROM employee WHERE first_name = 'EmployeeFirstName' AND last_name = 'EmployeeLastName');

-- View employees by manager
SELECT e.* 
FROM employee e
WHERE e.manager_id = (SELECT id FROM employee WHERE first_name = 'ManagerFirstName' AND