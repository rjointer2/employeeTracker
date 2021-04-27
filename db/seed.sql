-- DEPARTMENT TABLE
INSERT INTO department (dept) VALUES ('toys');
INSERT INTO department (dept) VALUES ('market');
INSERT INTO department (dept) VALUES ('guest service');

-- ROLE TABLE
INSERT INTO role (title, salary, dept_id) VALUES ('Market Team Member', 30000, 1);
INSERT INTO role (title, salary, dept_id)  VALUES ('Toy Team Member', 30000, 2);
INSERT INTO role (title, salary, dept_id)  VALUES ('Guest Service Team Member', 30000, 3);

-- EMPLOYEE TABLE
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Boss', 'Lady', 1, 1);
INSERT INTO employee (first_name, last_name, role_id) values ('John', 'Smith', 2);
INSERT INTO employee (first_name, last_name, role_id) values ('Karen', 'Singer', 3);
INSERT INTO employee (first_name, last_name, role_id) values ('Miley', 'Cyrus', 4);
