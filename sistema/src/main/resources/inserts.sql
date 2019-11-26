select *
from sistema.user;

insert into sistema.user values(default,current_timestamp,current_timestamp,true,'Rua Capitão Clóvis Maia, 465','07/09/1990','85996393216','04592686357','emmanoelcoelholima@gmai.com','Matheus Emmanuel Coelho Alves','5491c11f9ee6ff22b260040f4f1b1a3442d127c4','','mtsealves');

--update sistema.user set password = '5491c11f9ee6ff22b260040f4f1b1a3442d127c4'
--update sistema.user set active = true

select *
from sistema.profile;

insert into sistema.profile values(default,current_timestamp,current_timestamp,'admin');

select *
from sistema.uri;

insert into sistema.uri values (default,current_timestamp,current_timestamp,'^.*$');

select * 
from sistema.profiles_uris;

insert into sistema.profiles_uris values (1,1);

select *
from sistema.users_profiles;

insert into sistema.users_profiles values (1,1);

--drop schema sistema cascade;
--create schema sistema;