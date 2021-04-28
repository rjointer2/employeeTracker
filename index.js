
const inquirer = require("inquirer");

const DB = require('./db')

init()

function init() {
  inquirer.prompt(
      {
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "Update Department",
              "Update Employee Role",
              "Update Employee",
              "Review Status",
              "Exit",
          ]
      }
  ).then((res) => {
    console.log(res)
  })

 /*  const { action } = await inquirer.prompt(
    [
      {
          name: "action",
          type: "list",
          message: "What would you like to do?",
          default: true,
          choices: [
              "Update Department",
              "Update Employee Role",
              "Update Employee",
              "Review Status",
              "Exit",
          ]
      }
    ]
  );
  switch (action) {
    case "Edit Department":
      updateDepartments();
      break;
    case "Edit Employee Role":
      editRole();
      break;
    case "Edit Employee":
      editEmployee();
      break;
    case "View Information":
      reviewStatus();
      break;
    case "Exit":
      process.exit(0);
      break;
    default:
      break;
  } */

}
/* 
async function updateDepartments() {
    const departmentName = await inquirer.prompt({
      name: "department",
      type: "input",
      message: "Enter new department please...",
    });
  
    const data = departmentName.department
  
    const query = await connection.query(
      "INSERT INTO department SET ?",
      {
        dept: data,
      },
  
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " Department Added\n");
        init();
    });
}

async function deleteDepartment() {
    connection.query(
      "SELECT dept AS departments FROM department",
      async function (err, departments) {
        const data = await inquirer.prompt([
          {
            name: "departments",
            message: "What department would you like to remove?",
            type: "list",
            choices: departments.map((department) => ({
              name: department.departments,
            })),
          },
        ]);
        connection.query(
          "DELETE FROM department WHERE ?", {
          dept: data.departments,
        }),
          init();
      }
    );
}

  async function editEmployee() {
    const { employee } = await inquirer.prompt({
      name: "employee",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Employee", "Remove Employee", "Exit"],
    });
    if (employee === "Add Employee") {
      addEmployee();
    } else if (employee === "Remove Employee") {
      deleteEmployee();
    } else {
      init();
    }
  }
  
  async function addEmployee() {
    const insert = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleID",
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Market",
          "Toys",
          "Guest Service"
        ]
      },
      {
        name: "managerID",
        type: "confirm",
        message: "Is the employee a manager?",
      },
    ]);
    switch (insert.managerID) {
      case true:
        insert.managerID = 1;
        break;
      case false:
        insert.managerID = null;
        break;
    }
    const query = await connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: insert.firstName,
        last_name: insert.lastName,
        role_id: insert.roleID,
        manager_id: insert.managerID,
      },
  
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " Employee Added\n");
        init();
      });
}

async function deleteEmployee() {
    connection.query(
      "SELECT first_name AS firstName, last_name AS lastName FROM employee",
      async function (err, employees) {
        const data = await inquirer.prompt([
          {
            name: "employees",
            message: "Which employee would you like to delete?",
            type: "list",
            choices: employees.map((employee) => ({
              name: employee.firstName + " " + employee.lastName,
            })),
          },
        ]);
        console.log(data);
        const firstAndLast = data.employees.split(" ");
        console.log(firstAndLast[1]);
        connection.query(
          "DELETE FROM employee WHERE first_name = ? AND last_name = ?",
          [firstAndLast[0], firstAndLast[1]]
        );
        init();
      }
    );
}

async function editRole() {
    const { role } = await inquirer.prompt({
      name: "role",
      type: "list",
      message: "Select Action...",
      choices: ["Add Role", "Update Role", "Exit"],
    });
    if (role === "Add Role") {
      addRole();
    } else if (role === "Update Role") {
      updateRole();
    } else {
      init();
    }
};

async function addRole() {
    const departments = await connection.query(
      "SELECT dept, id FROM department",
    )
    console.log(departments);
    const { dept, title, salary } = await inquirer.prompt([
      {
        name: "dept",
        type: "list",
        message: "Which departments will this role be associated with?",
        choices: departments.map((row) => ({ name: row.dept, value: row.id })),
      },
      {
        name: "title",
        type: "input",
        message: "What role are you inserting?",
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary for this role?",
      },
    ])
    connection.query(`INSERT INTO role (title, salary, dept_id) VALUES ('${title}', ${salary}, ${dept})`,
  
    (err, res) => {
    if (err) throw err;
    console.log(res.affectedRows + " Role Added\n");
    init();
    });
};
  
async function updateRole() {
    const employees = await connection.query(
        "SELECT first_name AS firstName, last_name AS lastName, id FROM employee")
    const roles = await connection.query(
        "SELECT id, title, salary FROM role",
    )
    const { employee, role } = await inquirer.prompt([
        {
        name: "employee",
        type: "list",
        message: "Select an employee to update:",
        choices: employees.map((employee) => ({
            name: employee.firstName + " " + employee.lastName, value: employee.id
        })),
        },
        {
        name: "role",
        type: "list",
        message: "Select the new role:",
        choices: roles.map((row) => ({ name: row.title, value: row.id })),
        },
    ])
    connection.query(`UPDATE employee SET role_id = ${role} WHERE  id = ${employee}`,

    (err, res) => {
    if (err) throw err;
    console.log(res.affectedRows + " Role Added\n");
    init();
    });
};

async function reviewStatus() {
    const { event } = await inquirer.prompt({
      name: 'event',
      type: 'list',
      message: 'Select a topic',
      choices: ['Employees', 'Departments', 'Roles']
    });
    let query;
    if (e === 'Employees') {
      query = `SELECT  employee.first_name, employee.last_name,
        role.title, role.salary, department.dept AS department
        FROM ((employee
        INNER JOIN role ON employee.role_id = role.id)
        INNER JOIN department ON role.dept_id = department.id)
        ORDER BY department`;
    } else if (event === 'Departments') {
      query = `SELECT dept FROM department`;
    } else if (event === 'Roles') {
      query = `SELECT role.title, role.dept_id AS id, department.dept AS department FROM role 
      INNER JOIN department ON role.dept_id = department.id ORDER BY title ASC`;
    }
    const data = await connection.query(query);
    console.table(data);
    init();
} */