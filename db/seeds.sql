INSERT INTO department (department_name)
VALUES  ("sales"),
        ("engineering"),
        ("finances"),
        ("legal");


INSERT INTO role (role_title, salary, department_id)
VALUES  ("sales lead", 100000, 1),
        ("sales person", 80000, 1), 
        ("lead engineer", 150000, 2),
        ("softwarwe engineer", 120000, 2),
        ("account manager", 160000, 3),
        ("accountant", 125000, 3),
        ("legal team lead", 250000, 4),
        ("lawyer", 190000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, NULL),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, NULL),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, NULL),
        ("Tom", "Allen", 8, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
