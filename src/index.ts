import inquirer from "inquirer";

// bring in connection.ts the same way as the min project.



interface Question {
    type: string;
    name: string;
    message: string;
    choices: string[];
}

const questions:Question[] = [
    {
        type: 'list',
        name: 'departments',
        message: 'Please choose a license for your project.',
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

    // {
    //     type: 'input',
    //     name: 'departments',
    //     message: 'Please choose a license for your project.',
    // }

];

// Justin note: in order to use await we need to have it in an async function
// Create a async await init function to initialize app, inquire.prompt will be inside. 
// Switch statment to handle the different cases of the user input.
// with add role and dept, you will have to create a new sql query to add the role and dept to the database.

async function init() {
    const answers = await inquirer.prompt(questions);
    console.log('Selected:', answers.departments);
}

init();



//     // WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//     {
//         // WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
//         type: 'list',
//         name: 'departments',
//         message: 'Please choose a license for your project.',
//         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'None'],
//         when: (answers: any) => {
//             if (answers.departments === 'View all departments') {
//                 // Logic to fetch and display departments
//                 const departments = [
//                     { id: 1, name: 'HR' },
//                     { id: 2, name: 'Engineering' },
//                     { id: 3, name: 'Sales' }
//                 ];
//                 console.table(departments);
//                 return false; // Skip the rest of the questions
//             }
//             return true;
//         }
//     },
//     // WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//     {
//         type: 'list',
//         name: 'roles',
//         message: 'Please choose an action for roles.',
//         choices: ['View all roles', 'None'],
//         when: (answers) => {
//             if (answers.roles === 'View all roles') {
//                 // Logic to fetch and display roles
//                 const roles = [
//                     { id: 1, title: 'Manager', department: 'HR', salary: 60000 },
//                     { id: 2, title: 'Engineer', department: 'Engineering', salary: 80000 },
//                     { id: 3, title: 'Salesperson', department: 'Sales', salary: 50000 }
//                 ];
//                 console.table(roles);
//                 return false; // Skip the rest of the questions
//             }
//             return true;
//         }
//     },
//     // WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
//     {
//         type: 'list',
//         name: 'employees',
//         message: 'Please choose an action for employees.',
//         choices: ['View all employees', 'None'],
//         when: (answers) => {
//             if (answers.employees === 'View all employees') {
//                 // Logic to fetch and display employees
//                 const employees = [
//                     { id: 1, firstName: 'John', lastName: 'Doe', title: 'Manager', department: 'HR', salary: 60000, manager: 'None' },
//                     { id: 2, firstName: 'Jane', lastName: 'Smith', title: 'Engineer', department: 'Engineering', salary: 80000, manager: 'John Doe' },
//                     { id: 3, firstName: 'Emily', lastName: 'Jones', title: 'Salesperson', department: 'Sales', salary: 50000, manager: 'John Doe' }
//                 ];
//                 console.table(employees);
//                 return false; // Skip the rest of the questions
//             }
//             return true;
//         }
//     },
//     // WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
//     {
//         type: 'input',
//         name: 'addDepartment',
//         message: 'Please enter the name of the department:',
//         when: (answers) => answers.departments === 'Add a department',
//         validate: (input) => input ? true : 'Department name cannot be empty',
//         filter: (input) => {
//             // Logic to add the department to the database
//             const newDepartment = { id: Date.now(), name: input };
//             // Assuming you have a function to save the department to the database
//             saveDepartmentToDatabase(newDepartment);
//             console.log(`Department ${input} added to the database.`);
//             return input;
//         }
//     },
//     // WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//     {
//         type: 'input',
//         name: 'roleName',
//         message: 'Please enter the name of the role:',
//         when: (answers) => answers.departments === 'Add a role',
//         validate: (input) => input ? true : 'Role name cannot be empty',
//     },
//     {
//         type: 'input',
//         name: 'roleSalary',
//         message: 'Please enter the salary for the role:',
//         when: (answers) => answers.departments === 'Add a role',
//         validate: (input) => !isNaN(parseFloat(input)) && isFinite(input) ? true : 'Salary must be a number',
//     },
//     {
//         type: 'input',
//         name: 'roleDepartment',
//         message: 'Please enter the department for the role:',
//         when: (answers) => answers.departments === 'Add a role',
//         validate: (input) => input ? true : 'Department cannot be empty',
//         filter: (input: any, answers: any) => {
//             // Logic to add the role to the database
//             const newRole = { id: Date.now(), title: answers.roleName, salary: parseFloat(answers.roleSalary), department: input };
//             // Assuming you have a function to save the role to the database
//             saveRoleToDatabase(newRole);
//             console.log(`Role ${answers.roleName} added to the database.`);
//             return input;
//         }
//     },
//     //WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//     {
//         type: 'input',
//         name: 'employeeFirstName',
//         message: 'Please enter the first name of the employee:',
//         when: (answers) => answers.departments === 'Add an employee',
//         validate: (input) => input ? true : 'First name cannot be empty',
//     },
//     {
//         type: 'input',
//         name: 'employeeLastName',
//         message: 'Please enter the last name of the employee:',
//         when: (answers) => answers.departments === 'Add an employee',
//         validate: (input) => input ? true : 'Last name cannot be empty',
//     },
//     {
//         type: 'input',
//         name: 'employeeRole',
//         message: 'Please enter the role of the employee:',
//         when: (answers) => answers.departments === 'Add an employee',
//         validate: (input) => input ? true : 'Role cannot be empty',
//     },
//     {
//         type: 'input',
//         name: 'employeeManager',
//         message: 'Please enter the manager of the employee:',
//         when: (answers) => answers.departments === 'Add an employee',
//         validate: (input) => input ? true : 'Manager cannot be empty',
//         filter: (input, answers) => {
//             // Logic to add the employee to the database
//             const newEmployee = {
//                 id: Date.now(),
//                 firstName: answers.employeeFirstName,
//                 lastName: answers.employeeLastName,
//                 role: answers.employeeRole,
//                 manager: input
//             };
//             // Assuming you have a function to save the employee to the database
//             saveEmployeeToDatabase(newEmployee);
//             console.log(`Employee ${answers.employeeFirstName} ${answers.employeeLastName} added to the database.`);
//             return input;
//         }
//     },
//     // WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
//     {
//         type: 'list',
//         name: 'employeeToUpdate',
//         message: 'Please select the employee to update:',
//         choices: (): { name: string; value: number }[] => {
//             // Logic to fetch and return a list of employees
//             const employees = [
//                 { id: 1, name: 'John Doe' },
//                 { id: 2, name: 'Jane Smith' },
//                 { id: 3, name: 'Emily Jones' }
//             ];
//             return employees.map(employee => ({ name: employee.name, value: employee.id }));
//         },
//         when: (answers) => answers.departments === 'Update an employee role',
//     },
//     {
//         type: 'input',
//         name: 'newRole',
//         message: 'Please enter the new role for the employee:',
//         when: (answers) => answers.departments === 'Update an employee role',
//         validate: (input) => input ? true : 'Role cannot be empty',
//         filter: (input, answers) => {
//             // Logic to update the employee's role in the database
//             const updatedEmployee = {
//                 id: answers.employeeToUpdate,
//                 newRole: input
//             };
//             // Assuming you have a function to update the employee's role in the database
//             updateEmployeeRoleInDatabase(updatedEmployee);
//             console.log(`Employee role updated to ${input}.`);
//             return input;
//         }
//     },
// ];

// function saveDepartmentToDatabase(newDepartment: { id: number; name: any; }) {
//     throw new Error('Function not implemented.');
// }

// function saveRoleToDatabase(newRole: { id: number; title: any; salary: number; department: any; }) {
//     throw new Error('Function not implemented.');
// }

// function saveEmployeeToDatabase(newEmployee: { id: number; firstName: any; lastName: any; role: any; manager: any; }) {
//     throw new Error('Function not implemented.');
// }
// function updateEmployeeRoleInDatabase(updatedEmployee: { id: any; newRole: any; }) {
//     throw new Error('Function not implemented.');
// }

// function generateMarkdown(answers: any) {
//     throw new Error('Function not implemented.');
// }

// inquirer.prompt(questions).then((answers) => {
//     console.log('Selected:', answers.departments);
// });

//  Create a function to initialize app
// function init() {
//     inquirer.prompt(questions)
//         .then((answers) => {
//             const markdown = generateMarkdown(answers);
//             writeToFile('README.md', markdown);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }
// // Function call to initialize app
// init();

// // Create a function to write README file
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, (err) =>
//         err ? console.error(err): console.log('ReadMe file created!'))
// }


