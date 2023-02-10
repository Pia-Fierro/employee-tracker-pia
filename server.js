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

const promptUser = () => {
    inquirer.prompt ([
        {
            name:'option',
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
                'Exit',
            ]
        }
    ])

    .then((answer) => {
        switch (answer.action) {
            case "View all the departments":
                viewallDep();
                break;
            case "View all the roles":
                vieallRols();
                break;  
            case "view all the employees":
                vieallEmpl();
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
        }
    });
}

// view all department