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
    console.log("connected");
    init();
  });

function init() {
    //Inquirer
    inquirer
        .prompt({
            name: "command",
            type: "rawlist",
            message: "Hello what would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Exit"
            ]
        })
        .then(function(response) {
            //If Else statements for matching the response from the user to the query functions that link to the database.
            if (response.command === "View all departments") {
                viewDepartments();
            }
             else if (response.command === "View all roles") {
                 viewRoles();
             }
             else if (response.command === "View all employees") {
                viewEmployees();
             }
            else if (response.command === "Exit") {
                connection.end();
            }
        })
};