require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const  mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT_APP;

// configurar middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// configuracion del motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))
//connection.end();

const conexion = mysql.createConnection({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  port: process.env.PORT_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DATABASE
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
      mensaje = 'Perfecto!';
      codeError =false;
      if (error) throw error;
        res.render('crearusuario', {
             titulo: 'Crear usuario',
             codeError,
             mensaje
        });
    });
  }

});

  /*********************************** */
  app.get('/login', (req, res) => {
    res.render('login', {
      nombre: 'Rocio Ruperto',
      titulo: 'Login',
    });
  });

  
  app.post('/login', (req, res) => {
    let mensaje = '';
    let codeError=true;
    /********************************** */
    if(req.body.nombre == '' || req.body.email == '') {
      mensaje = 'Rellene los campos correctamente';
      res.render('login', {
        titulo: 'login',
        codeError,
        mensaje
      });
    } 
    else {
      
     let datos = {
       email: req.body.email,
       password: req.body.password
     }

     let sql = `SELECT password FROM user WHERE email='` + req.body.email + `'`;
     let password = ''
     conexion.query(sql, (error, results, fields) => {
       if (error) throw error;
       
       mensaje = 'Chequee mail o contrasenia';
       
       console.log(results);
       password = results[0].password     
       console.log(password);

       if(password === req.body.password) {
        codeError= false;
        mensaje = 'Has logrado entrar!';
        res.render('login', {
          titulo: 'login',
           codeError,
           mensaje
        });

       } else {
        codeError= true;
        mensaje = 'No has logrado entrar.';
        res.render('login', {
          titulo: 'login',
           codeError,
           mensaje
        });
       }
 
    });
 
    }
    
  })
