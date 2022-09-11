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
  database: "entregaPwi"
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

  app.get('/crearusuario', (req, res) => {
    res.render('crearusuario', {
      nombre: 'Rocio Ruperto',
      titulo: 'Crear usuario',
    });
});

app.post('/crearusuario', (req, res) => {
  console.log(req.body);
  let mensaje = '';
  let codeError=true;
  /********************************** */
  if(req.body.nombre == '' || req.body.email == '') {
    mensaje = 'Rellene los campos correctamente';
    res.render('crearusuario', {
      titulo: 'Crear usuario',
      codeError,
      mensaje
    });
  } 
  else {

   let datos = {
      userName: req.body.nombre,
     email: req.body.email,
     password: req.body.password

   };

   let sql = 'INSERT INTO user SET ?';
    conexion.query(sql, datos, (error, result) => {
      mensaje = 'Perfecto todo kpo!!';
      codeError =false;
      if (error) throw error;
        res.render('crearusuario', {
             titulo: 'Crear usuario',
             codeError,
             mensaje
        });
    });
  }
  /*********************************** */

});