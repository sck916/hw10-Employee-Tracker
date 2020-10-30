//Dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("CONNECTED!!");
    init();
  });

//   function viewAll(){
//      let query = `SELECT employee.id,  first_name, last_name, salary, departmentName, manager_id
//       FROM employee
//       JOIN roles 
//       ON role_id = roles_id
//       JOIN department ON department_id = department_id`
//       connection.query(query),(err,result) => {
//           if(err) throw err;
//           console.log("\n\n");
//           console.table(result);
//       }
//   }


function viewDepartments (){
    connection.query("SELECT * FROM department;",function(err, data){
        console.log("error Results",err);
        console.table(data)
    })
    
}
function viewRoles(){
    connection.query("SELECT * FROM roles;",function(err, data){
        console.log("error Results",err);
        console.table(data)
    })
    
}

function viewEmployee(){
    connection.query("SELECT * FROM employee;",function(err, data){
        console.log("error Results",err);
        console.table(data)
    })
    
}
function addDepartment(){
    console.log("TIME TO ADD DEPART");
    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "Whats the new department name",
        })
        .then(function(response) {
            console.log(response);
            connection.query("INSERT INTO department (departmentName) VALUES (?);",[response.deptName],function(err, data){
                console.log("error Results",err,data);
            })

        })
}

function addRole(){
    console.log("TIME TO ADD DEPART");
    connection.query("SELECT * FROM department;",function(err, data){
        console.log("error Results",err,data);

        var deptStr = []
        for (let i = 0; i < data.length; i++) {
            
            console.log('are we looping ?', data[i].departmentName)
            deptStr.push(data[i].departmentName)
            
        }

        console.log('just strings array!!!', deptStr)
        
        inquirer
            .prompt([
                {
                    name: "Title",
                    type: "input",
                    message: "Whats your Title",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Whats your salary",
                },
                {
                    name: "Dept",
                    type: "list",
                    message: "Whats your dept",
                    choices: deptStr
                }
                
            ])
            .then(function(response) {
                console.log(response);

                var deptId;
                for (let i = 0; i < data.length; i++) {
                
                    if(response.Dept === data[i].departmentName){
                        console.log("MATCHMATCH",data[i]);
                        deptId = data[i].id
                        
                    }
                    
                }

                console.log("deptId",deptId);

                connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);",[response.Title, response.salary, deptId],function(err, data){
                    console.log("error Results",err,data);
                })
    
            })

    })
    
};

function addEmployee(first_name, last_name, role_id, manager_id){
    let query =`INSERT INTO employee (first_name, last_name, role_id, manager) VALUES(?,?,?)`
    connection.query(query, [first_name, last_name, role_id,manager_id],(err,result) =>{
        if (err) throw err;
        console.log('WE ADDED AN EMPLOYEE',err,data);
    })
};


function init() {
    //THIS IS  FOR INQUIRER
    inquirer
        .prompt({
            name: "command",
            type: "rawlist",
            message: "Hello what would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employee",
                "Add Department",
                "Add Role",
                "Exit"
            ]
        })

        .then(function(response) {
            //If Else statements matching the user response to the query functions that link to the database.
            if (response.command === "View all departments") {
                viewDepartments();
            }
             else if (response.command === "View all roles") {
                 viewRoles();
             }
             else if (response.command === "Add Department") {
                addDepartment();
            }

            else if (response.command === "Add Role") {
                addRole();
             }
             else if (response.command === "View all employee") {
                viewEmployee();
             }
            else if (response.command === "Exit") {
                connection.end();
            }
            
        })
};