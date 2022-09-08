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


app.listen(PORT, () => {
  // console.log(`el servidor esta trabajando en el Puerto ${PORT}`);
 });

 app.get('/', (req, res) => {
  res.render('index', {
    titulo: '',
  })
});
 
app.get('/contacto', (req, res) => {
  res.render('contacto', {
    titulo: '',
  })
});

app.get('/servicios', (req, res) => {
  res.render('servicios', {
    titulo: '',
  })
});
