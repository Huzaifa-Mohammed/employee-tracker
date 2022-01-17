const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sql = require("mysql2");


const db = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: 4321,
        database: 'company_cms'
    },
    console.log("connection created to db")
);

db.connect((err) => {
    if (err) throw err;
    tableOptions();
});


tableOptions = () => {
    return inquirer
        .prompt([{
            type: "list",
            name: "options",
            message: "What would you like to do? (Required)",
            validate: (list) => {
                if (list) {
                    return true
                } else { return 'Please pick something' }
            },
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Quit",
            ],
        }])
        .then((choice) => {
            if (choice.options === "View all departments") {
                return viewAllDepartments();
            } else if (choice.options === "View all roles") {
                return viewAllRoles();
            } else if (choice.options === " View all employees") {
                return viewAllEmployees();
            } else if (choice.options === " Add a department") {
                return addDepartment();
            } else if (choice.options === " Add a role") {
                return addRole();
            } else if (choice.options === " Add an employee") {
                return addEmployee();
            } else if (choice.options === " Update an employee role") {
                return updateEmployee();
            } else {
                console.log("Lets try again");
                tableOptions();
            }
        })
}

function viewAllDepartments() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, res) => {
        if (err)
            throw err;
        console.log("\n");
        console.table(res);
        tableOptions();
    });
}


function viewAllRoles() {
    const sql = `SELECT roles.*,
      department.depart_name AS depart_name FROM roles LEFT JOIN department ON roles.department_id = department.id;`;

    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log(table.create(result));
        console.log("\n\n")
        tableOptions();
    });
};

function viewAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, 
    roles.salary, CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager 
  FROM employee
  LEFT JOIN employee manager ON employee.manager_id = manager.id 
  INNER JOIN roles ON employee.role_id = roles.id;`;
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log(table.create(result));
        console.log("\n\n")
        tableOptions();
    });

}


function addDepartment(departmentQn) {
    const sql = `INSERT INTO department (depart_name)
  VALUES
  ('${departmentQn.D_name}');`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.log("ADDED");
        viewAllDepartments();
    });
}


function addRole(roleQn) {
    const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES
  ('${roleQn.title}', ${roleQn.salary}, ${roleQn.department});`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.log("ADDED");
        viewAllRoles();
    });
}

function addEmployee(employeeQn) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('${employeeQn.first}', '${employeeQn.last}', '${employeeQn.role}', '${employeeQn.manager}');`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.log("ADDED");
        viewAllEmployees();
    });
}


/// QUestions asked

departmentQn = () => {
    return inquirer
        .prompt([{
                type: "input",
                name: "Dname",
                message: "What is the name of the department"

            },

        ]).then(addDepartment);
};
roleQn = () => {
    return inquirer
        .prompt([{
                type: "input",
                name: "title",
                message: "What is the name of the role you would like to add"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of this role?",
            },
            {
                type: "input",
                name: "department",
                message: "Which department does this role belong to ?",
            },
        ]).then(addRole);
};
employeeQn = () => {
    return inquirer
        .prompt([{
                type: "input",
                name: "first",
                message: "what is the employee's first name? "
            },
            {
                type: "input",
                name: "last",
                message: "what is the employee's last name ?"
            },
            {
                type: "input",
                name: "role",
                message: "what is the role of your employee ?"
            },
            {
                type: "input",
                name: "manager",
                message: "Who is the manager of your employee ?"
            }
        ]).then(addEmployee);
};