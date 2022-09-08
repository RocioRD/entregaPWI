create database entregaPwi;
use entregaPwi;
use suscripcion;


-- creacion de la tabla suscripcion --
create table suscripcion(
suscriptorId int unsigned not null auto_increment primary key,
nombre varchar(50) not null,
email varchar(100) not null,
edad smallint
);



