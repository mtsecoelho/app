select *
from sistema.user;

insert into sistema.user values(default,current_timestamp,current_timestamp,'Rua Capitão Clóvis Maia, 465','07/09/1990','(85) 99639-3216','045.926.863-57','emmanoelcoelholima@gmai.com','Matheus Emmanuel Coelho Alves','','mtsealves',true,'5491c11f9ee6ff22b260040f4f1b1a3442d127c4');
insert into sistema.user values(default,current_timestamp,current_timestamp,'Rua Capitão Clóvis Maia, 465','21/04/1960','(85) 99999-1910','143.562.523-49','antoniolima@gmai.com','Antonio Lima Alves','','aalves',true,'5491c11f9ee6ff22b260040f4f1b1a3442d127c4');

--update sistema.user set password = '5491c11f9ee6ff22b260040f4f1b1a3442d127c4'
--update sistema.user set active = true

select *
from sistema.profile;

insert into sistema.profile values(default,current_timestamp,current_timestamp,'admin');
insert into sistema.profile values(default,current_timestamp,current_timestamp,'user_ro');

select *
from sistema.uri;

insert into sistema.uri values (default,current_timestamp,current_timestamp,'^.*$');
insert into sistema.uri values (default,current_timestamp,current_timestamp,'^/sistema/api/user/list$');

select *
from sistema.form;

insert into sistema.form values (default,current_timestamp,current_timestamp,'/usuario');

select * 
from sistema.profiles_uris;

insert into sistema.profiles_uris values (1,1);
insert into sistema.profiles_uris values (2,2);

select * 
from sistema.profiles_forms;

insert into sistema.profiles_forms values (1,1);

select *
from sistema.users_profiles;

insert into sistema.users_profiles values (1,1);
insert into sistema.users_profiles values (2,2);

--drop schema sistema cascade;
--create schema sistema;