select *
from sistema.user;

INSERT INTO sistema."user"(user_id, created_at, updated_at, address, birth_date, celphone,cpf, email, name, telephone, active, password, username) VALUES (default,current_timestamp,current_timestamp,'Rua Capitão Clóvis Maia, 465','07/09/1990','(85) 99639-3216','045.926.863-57','emmanoelcoelholima@gmai.com','Matheus Emmanuel Coelho Alves','',true,'5491c11f9ee6ff22b260040f4f1b1a3442d127c4','mtsealves');
INSERT INTO sistema."user"(user_id, created_at, updated_at, address, birth_date, celphone,cpf, email, name, telephone, active, password, username) VALUES (default,current_timestamp,current_timestamp,'Rua Capitão Clóvis Maia, 465','21/04/1960','(85) 99999-1910','143.562.523-49','antoniolima@gmai.com','Antonio Lima Alves','',true,'5491c11f9ee6ff22b260040f4f1b1a3442d127c4','aalves');

--update sistema.user set password = '5491c11f9ee6ff22b260040f4f1b1a3442d127c4'
--update sistema.user set active = true

select *
from sistema.profile;

INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Admin');
INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Professor');
INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Aluno');
INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Responsavel');
INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Coordenador');
INSERT INTO sistema.profile(profile_id, created_at, updated_at, name) VALUES (default,current_timestamp,current_timestamp,'Financeiro');

select *
from sistema.uri;

INSERT INTO sistema.uri(uri_id, created_at, updated_at, form, uri) VALUES (default,current_timestamp,current_timestamp, 'usuario', '^/sistema/api/user/list$');
INSERT INTO sistema.uri(uri_id, created_at, updated_at, form, uri) VALUES (default,current_timestamp,current_timestamp, 'usuario', '^/sistema/api/user/save$');
INSERT INTO sistema.uri(uri_id, created_at, updated_at, form, uri) VALUES (default,current_timestamp,current_timestamp, 'usuario', '^/sistema/api/user/delete$');

select * 
from sistema.profiles_uris;

insert into sistema.profiles_uris values (1,1);
insert into sistema.profiles_uris values (1,2);
insert into sistema.profiles_uris values (1,3);
insert into sistema.profiles_uris values (2,1);

select *
from sistema.users_profiles;

insert into sistema.users_profiles values (1,1);
insert into sistema.users_profiles values (2,2);

--drop schema sistema cascade;
--create schema sistema;

select u.username,p.name,uri.form,array_agg(uri.uri) as uris
from sistema.user u
inner join sistema.users_profiles up using (user_id)
inner join sistema.profile p using (profile_id)
inner join sistema.profiles_uris pu using (profile_id)
inner join sistema.uri uri using (uri_id)
group by 1,2,3
order by 1,2,3