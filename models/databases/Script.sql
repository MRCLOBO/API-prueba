--Creacion de la base de datos
create database usuariosdb;

--Usar la BD
 usuariosdb;


--crear la tabla de accesorios ya que es un array
create table accesorio(
id serial primary key,
name varchar(200) not null unique
);


--Crear la tabla de usuarios
create table usuario(
id serial primary key,
nombre varchar(100) not null,
estudiante varchar(2) not null
);
drop table usuario;
drop table usuario_accesorio
--Crear la tabla que relaciona a ambas tablas
create table usuario_accesorio(
usuario_id int references usuario(id),
accesorio_id int references accesorio(id),
primary key(usuario_id,accesorio_id)
);

insert into usuario(nombre,estudiante) values ('Marcelo','si'),
('Pedro','no'),
('Mario','no'),
('Pablo','si'),
('Nimia','no'),
('Nuria','si')

insert into accesorio(name) values 
('lentes'),
('collar'),
('reloj'),
('gorro')

insert into usuario_accesorio(usuario_id,accesorio_id) values
((select id from usuario where nombre='Pedro'),(select id from accesorio where name = 'reloj')),
((select id from usuario where nombre='Marcelo'), (select id from accesorio where name='reloj')),
((select id from usuario where nombre='Nimia'), (select id from accesorio where name='lentes'))

select * from usuario
select * from accesorio
select * from usuario_accesorio

select id from accesorio where name = 'lentes'

