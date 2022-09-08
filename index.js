const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const  mysql = require('mysql2');
const nodemailer = require('nodemailer');
const { resourceLimits } = require('worker_threads');
const app = express();
const PORT = 8080;

// configurar middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// configuracion del motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))
//connection.end();

console.log(process.env.USER)
// conexion a la base de datos
/*
const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
*/

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "fullstack"
});


conexion.connect((err) => {
  if (err) {
    console.error(`Error en la conexion: ${err.stack}`)
    return;
  }
  console.log(`Conectado a la base de datos ${process.env.DATABASE}`);
  });

app.listen(PORT, () => {
  console.log(`el servidor esta trabajando en el Puerto ${PORT}`);
});

 app.get('/', (req, res) => {
  res.render('index', {
    nombre: 'Rocio Ruperto',
  })
});
 
app.get('/contacto', (req, res) => {
  res.render('contacto', {
    nombre: 'Rocio Ruperto',
  })
});

app.get('/servicios', (req, res) => {
  res.render('servicios', {
    nombre: 'Rocio Ruperto',
  });
});

  app.get('/suscripcion', (req, res) => {
    res.render('suscripcion', {
      nombre: 'Rocio Ruperto',
    });
});
