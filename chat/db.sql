
CREATE DATABASE calendar CHARACTER
SET utf8 COLLATE utf8_general_ci;


-- создание таблиц
CREATE TABLE events (id_events INT NOT NULL AUTO_INCREMENT, id_grp INT default NULL, dt_start DATE default NULL, dt_end DATE default NULL, name varchar(100) default NULL, color varchar(20) default NULL, PRIMARY KEY (id_events))   ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 ;


-- установка связей
-- ALTER TABLE user_group ADD CONSTRAINT cnst_user_group_ref_user FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE RESTRICT;

-- ALTER TABLE user_group ADD CONSTRAINT cnst_user_group_ref_grp FOREIGN KEY (id_grp) REFERENCES grp(id_grp) ON DELETE RESTRICT;

-- вставка записей 

-- создание пользователей
INSERT INTO events (id_grp, dt_start, dt_end, name, color) VALUES (null, ?, ?, ?, ?); 
-- INSERT INTO user (id_user, login, password) VALUES (2, 'admin', '123456');
-- INSERT INTO user (id_user, login, password) VALUES (3, 'admin', '123456');
-- INSERT INTO user (id_user, login, password) VALUES (4, 'admin', '123456');
-- INSERT INTO user (id_user, login, password) VALUES (5, 'admin', '123456');
-- INSERT INTO user (id_user, login, password) VALUES (6, 'admin', '123456');
-- INSERT INTO user (id_user, login, password) VALUES (7, 'admin', '123456');



INSERT INTO grp (id_grp, login, password) VALUES (1, 'admin', '123456');

-- переименовать колонку
alter table `table name` change `old column name` `new column name` varchar (50);
alter table `grp` change `login` `name group` varchar (30);
alter table `grp` change `name group` `name_group` varchar (30);
alter table `grp` change `password` `role` varchar (50);

-- создание групп
INSERT INTO table_name (id_table_name, login, 
passwd) VALUES (NULL, 'admin', '123456');

INSERT INTO grp (id_grp, name_group, 
role) VALUES (1, 'admin', 'role 1'); 

INSERT INTO grp (id_grp, name_group, 
role) VALUES (2, 'users', 'role 2');

INSERT INTO grp (id_grp, name_group, 
role) VALUES (3, 'users', 'role 2');

INSERT INTO grp (id_grp, name_group, 
role) VALUES (4, 'users', 'role 2');

INSERT INTO grp (id_grp, name_group, 
role) VALUES (5, 'redactor', 'role 3');

-- создание строк в user_group
INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (1, '1', '1');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (2, '2', '2');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (3, '3', '2');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (4, '4', '2');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (5, '5', '3');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (6, '6', '4');

INSERT INTO user_group (id_user_group, id_user, 
id_grp) VALUES (7, '7', '4');

-- удаление записей

DELETE FROM table_name 
WHERE id_table_name = 99;

DELETE FROM user_group 
WHERE id_user_group = 6;

DELETE FROM user_group 
WHERE id_user_group = 7;

insert into events (id_grp, dt_start, dt_end, name, color) values ("1", "28.02.2017", "28.02.2017", "node", "#000000")
INSERT INTO events (id_grp, dt_start, dt_end, name, color) VALUES (null, ?, ?, ?, ?);

insert into events (id_grp, dt_start, dt_end, name, color) values ("1, 28.02.2017, 28.02.2017, node, #000000") 