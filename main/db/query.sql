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