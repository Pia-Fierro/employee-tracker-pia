// import and require modules
const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const table = require ('console.table');




//conection to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'abcd1234',
      database: 'employee_db'
    },
    console.log(`Connected to employee_db database.`)
);
// conecting and starting app
db.connect ((err) => { 
    if(err) throw err;
    console.log("\n Welcome to employee tracker\n");
    promptUser();
})

 function promptUser() {
    inquirer.prompt (
        {
            name:'options',
            type: 'list',
            message: 'Please select an option',
            choices: [
                'View all the departments',
                'View all the roles',
                'view all the employees',
                'Add a new department',
                'Add a new role',
                'Add a new employee',
                'Update the role of an existing employee',
                // 'Update employee manager', 'View employee by manager', 'view employees by department',
                // 'Delete demartments', 'Delete roles', 'Delete employees', 'View the total utilized budget of a department'
                'Exit'
            ]
        }
    )

    .then((answer) => {
        switch (answer.options) {
            case "View all the departments":
                viewallDep();
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
                addNewRol();
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

function viewallDep () {
    db.connect (function(err) {
        if (err) throw err;
        db.query("SELECT department.department_name AS 'Department name', department.id AS 'Department ID' FROM department", function (err, result){
            if(err) throw err;
            console.log("\n");
            console.table(result);
            promptUser();
        });
    })
}
function viewAllRoles () {
    db.connect (function(err) {
        if (err) throw err;
        db.query("SELECT  role.role_title AS 'Job title', role.id AS 'Role ID', role.salary, department.department_name AS 'Department' FROM role JOIN department ON role.id = department.id", function (err, result){
            if(err) throw err;
            console.log("\n");
            console.table(result);
            promptUser();
        });
    })
}
// missing manager name instead of manager id.
function viewallEmpl () {
    db.connect (function(err) {
        if (err) throw err;
        db.query("SELECT employee.id AS 'Employee ID', employee.first_name AS 'Name', employee.last_name AS 'Last name', role.role_title AS 'Job title', role.salary, department.department_name AS 'Department',employee.manager_id FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id", function (err, result){
            if(err) throw err;
            console.log("\n");
            console.table(result);
            promptUser();
        });
    })
}

function addNewDep () {
    inquirer.prompt (
        {
            type: 'input',
            message: 'Please type the department name you want to add',
            name: 'new_department'
        }
    )
    .then((answer) => {
        let newDepartment = answer.new_department;
        db.connect(function(err){
            if (err) throw err;
            db.query("INSERT INTO department(department_name) VALUES (?)", newDepartment ,function (err, result){
                if(err) throw err;
                console.log("\n");
                console.log(newDepartment + "" + "department created")
                console.table(result)
                viewallDep();
            })
        })
    });
}

// function addNewRol () {
//     inquirer.prompt (
//         {
//             type: 'input',
//             message: 'Please type the role name you want to add',
//             name: 'new_role'
//         })
// }