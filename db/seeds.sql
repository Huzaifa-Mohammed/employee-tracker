INSERT INTO department (depart_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO roles (title,salary,department_id)
VALUES 
("CEO",110000,null),
("Quality Engineer",80000,1),
("Associate",51000,2),
("Support Staff",52000,3),
("Senior Designer",65000,4),
("Operations Manager",95000,2),
("Accountant",65000,3),
("Manager",65000,3),
("Representative",60000,1);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES 
("Justin","Ross",8,null),
("Mike","Ross",2,1),
("John","Cena",3,1),
("Tom","Jerry",4,1),
("Lil","Wayne",5,1),
("Dwayne","Rock",6,1),
("April","Levine",7,1),
("Wayne","Rooney",5,1),
("Pete","Davidson",4,1);