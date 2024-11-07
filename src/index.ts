import inquirer from "inquirer";

// bring in connection.ts the same way as the min project.
import { pool, connectToDb } from './connection.js';

await connectToDb();

interface Question {
    type: string;
    name: string;
    message: string;
    choices: string[];
}

// Questions function to prompt user to choose select options
const questions:Question[] = [
    {
        type: 'list',
        name: 'departments',
        message: 'Please select from the following options.',
        choices: [
            // build a function for each option in a switch statement
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'None'
        ]
    }

];

// Justin note: in order to use await we need to have it in an async function
// Create a async await init function to initialize app, inquire.prompt will be inside. 
// Switch statment to handle the different cases of the user input.
// with add role and dept, you will have to create a new sql query to add the role and dept to the database.
// Use comments as checklist to get each function working correctly. 

// Create a function to initialize app
async function init() {
    const answers = await inquirer.prompt(questions);
    console.log('Selected:', answers.departments);

    switch (answers.departments) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        default:
            console.log('Exiting application.');
            process.exit(0);
    }
}

// Function for viewing departments
async function viewDepartments() {
    const sql = `SELECT * FROM department`;

    try {
        const result = await pool.query(sql);
        const { rows } = result;
        console.table(rows);
        init();
    } catch (err) {
        console.error(err);
    }
}

// Function to view roles
async function viewRoles() {
    const sql = `SELECT * FROM role`;

    try {
        const result = await pool.query(sql);
        const { rows } = result;
        console.table(rows);
        init();
    } catch (err) {
        console.error(err);
    }
}

// Function to view employees
async function viewEmployees() {
    const sql = `SELECT 
            e.id AS employee_id,
            e.first_name,
            e.last_name,
            r.title AS role,
            d.name AS department,
            r.salary,
            COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager
        FROM 
            employee e
        LEFT JOIN 
            role r ON e.role_id = r.id
        LEFT JOIN 
            department d ON r.department_id = d.id
        LEFT JOIN 
            employee m ON e.manager_id = m.id`;

    try {
        const result = await pool.query(sql);
        const { rows } = result;
        console.table(rows);
        init();
    } catch (err) {
        console.error(err);
    }
}

// Function to add a department
async function addDepartment() {
    const newDepartment = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    const sql = `INSERT INTO department (name) VALUES ($1)`;
    const values = [newDepartment.name];

    try {
        await pool.query(sql, values);
        console.log('Department added successfully.');
        init();
    } catch (err) {
        console.error(err);
    }
}

// Function to add a role
async function addRole() {
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID of the role:'
        }
    ]);

    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    const values = [newRole.title, newRole.salary, newRole.department_id];

    try {
        await pool.query(sql, values);
        console.log('Role added successfully.');
        init();
    } catch (err) {
        console.error(err);
    }
}

// Function to add an employee
async function addEmployee() {
    const roles = await pool.query('SELECT id, title FROM role');
    const roleChoices = roles.rows.map((role: any) => ({
        name: role.title,
        value: role.id
    }));

    const manager = await pool.query('SELECT id, first_name, last_name FROM employee');
    const managerChoices = manager.rows.map((employee: any) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    managerChoices.unshift({ name: 'None', value: null });

    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role of the employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager or select None:',
            choices: managerChoices
        }
    ]);

    // Set manager_id to null if it is empty
    const managerId = newEmployee.manager_id ? newEmployee.manager_id : null;

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const values = [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, managerId];

    try {
        await pool.query(sql, values);
        console.log('Employee added successfully.');
        init();
    } catch (err) {
        console.error(err);
    }
}


async function updateEmployeeRole() {
    const employees = await pool.query('SELECT * FROM employee');
    const roles = await pool.query('SELECT * FROM role');

    const employeeChoices = employees.rows.map((employee: any) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roleChoices = roles.rows.map((role: any) => ({
        name: role.title,
        value: role.id
    }));

    const updatedEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select an employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select a new role for the employee:',
            choices: roleChoices
        }
    ]);

    const sql = `UPDATE employee SET role_id = $1 WHERE id = $2`;
    const values = [updatedEmployee.role_id, updatedEmployee.employee_id];

    try {
        await pool.query(sql, values);
        console.log('Employee role updated successfully.');
        init();
    } catch (err) {
        console.error(err);
    }
}

init();
