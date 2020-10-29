USE employee_db;

-- DEPARTMENT
INSERT INTO department (name) VALUES ("Media");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("Legal");

-- ROLE
INSERT INTO role (title, salary, department_id) VALUES ('Manager', 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Advocate', 75, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Supervisor', 50, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 90, 4);

-- EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Steve', 'Mcsteverson', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Johnson', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jeffery', 'Jeffers', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Bob', 'Loblaw', 4);
