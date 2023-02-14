// import and require modules
const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");

//conection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "abcd1234",
    database: "employee_db",
  },
  console.log(`Connected to employee_db database.`)
);

// conecting and starting app
db.connect((err) => {
  if (err) throw err;
  console.log("\n Welcome to employee tracker\n");
  promptUser();
});

function promptUser() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "Please select an option",
      choices: [
        "View all the departments",
        "View all the roles",
        "view all the employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update the role of an existing employee",
        // 'Update employee manager', 'View employee by manager',
        // 'view employees by department',
        // 'Delete demartments', 'Delete roles',
        // 'Delete employees', 'View the total utilized budget of a department'
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.options) {
        case "View all the departments":
          viewallDept();
          break;
        case "View all the roles":
          viewAllRoles();
          break;
        case "view all the employees":
          viewallEmpl();
          break;
        case "Add a new department":
          addNewDep();
          break;
        case "Add a new role":
          addNewRole();
          break;
        case "Add a new employee":
          addNewEmpl();
          break;
        case "Update the role of an existing employee":
          updateEmpRol();
          break;
        case "Exit":
          // Finish the connection and exit the app.
          db.end();
          break;
      }
    });
}

// view all department
function viewallDept() {
    db.query(
      "SELECT department.department_name AS 'Department name', department.id AS 'Department ID' FROM department",
      function (err, result) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
        promptUser();
      }
    );
}

function viewAllRoles() {
    db.query(
      "SELECT  role.id, role.role_title, role.salary, department.department_name FROM role INNER JOIN department ON role.department_id = department.id",
      function (err, result) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
        promptUser();
      }
    );
}
// missing manager name instead of manager id.
function viewallEmpl() {
    db.query(
      "SELECT employee.id AS 'Employee ID', employee.first_name AS 'Name', employee.last_name AS 'Last name', role.role_title AS 'Job title', role.salary, department.department_name AS 'Department',employee.manager_id FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id",
      function (err, result) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
        promptUser();
      }
    );
}

// // creating a manager array
// var managers = [];
// function viewManagers () {
//         db.query("SELECT first_name + ' ' + last_name AS name FROM employee where manager_id IS NULL", function (err, result){
//             if(err) throw err
//             for (var i=0; i< result.length; i++){
//                 managers.push(result[i].name)
//             }
//         });
//     console.log(managers) 
//     return managers;
//     }

// creating a department array

function addNewDep() {
  inquirer
    .prompt({
      type: "input",
      message: "Please type the department name you want to add",
      name: "new_department",
    })
    .then((answer) => {
      let newDepartment = answer.new_department;
      db.query("INSERT INTO department(department_name) VALUES (?)",newDepartment,function (err, result) {
            if (err) throw err;
            console.log("\n");
            console.log(newDepartment + " " + "department created");
            console.log(result);
            viewallDept();
          }
        );
      });
}

let departmentChoices = [];
function selectDepartment() {
     db.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      // console.log(result);
      for (var i = 0; i < result.length; i++) {
        departmentChoices.push(result[i].department_name);
      }
    });
  // console.log(departmentChoices);
  return departmentChoices;
}

function addNewRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please type the role title you want to add",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary of the new role",
        name: "salary",
      },
      {
        type: "list",
        message: "To what department this new role belongs?",
        name: "department",
        choices: selectDepartment()
      },
    ])
    .then((answer) => {
      // let allDepartments = selectDepartment();
      let newRole = answer.title;
      let newRoleSalary = answer.salary;
      console.log(answer);

      //Find the matching id that matches the chosen department
      new Promise ((resolve) => {
        db.query("SELECT * FROM department", function (err, result) {
          resolve(result);
        });
      }).then((allDepartments) => {

        var chosenDepartment = allDepartments.find((department) => {
          return answer.department == department.department_name;
        })

        var departmentId = chosenDepartment.id;
        console.log(departmentId, 'departmentId');

        db.connect(function (err) {
        if (err) throw err;
        db.query(
          "INSERT INTO role SET ?",
          {
            role_title: newRole,
            salary: newRoleSalary,
            department_id: departmentId,
          },

          function (err, result) {
            if (err) throw err;
            console.log("\n");
            console.log("New" + " " + newRole + " " + "role had been created");
            console.table(result);
            viewAllRoles();
          }
        );
      });

      });
    });
  }
//     .then((answer) => {
//       let newRole = answer.title;
//       let newRoleSalary = answer.salary;
//       let departmentId = answer.department;
//       db.connect(function (err) {
//         if (err) throw err;
//         db.query(
//           "INSERT INTO role SET ?",
//           {
//             role_title: newRole,
//             salary: newRoleSalary,
//             department_id: departmentId,
//           },

//           function (err, result) {
//             if (err) throw err;
//             console.log("\n");
//             console.log("New" + " " + newRole + " " + "role had been created");
//             console.table(result);
//             viewAllRoles();
//           }
//         );
//       });
//     });
// }
