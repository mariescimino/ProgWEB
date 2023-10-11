var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');
var novedadesModel=require('../models/novedadesModel')

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades= await novedadesModel.getNovedades();

  res.render('index', { novedades });
});

router.post('/', async(req, res, next)=>{
  
  console.log(req.body) //estoy cpaturando los datos?

  var nombre= req.body.nombre;
  var apellido= req.body.apellido;
  var email= req.body.email;
  var tel= req.body.tel;
  var mensaje= req.body.mensaje;

  var obj= {
    to:'mariescimino@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " se contacta a traves y quiere mas info a este correo: " + email + ". <br> Ademas, hizo el siguiente mensaje: " + mensaje +". <br> Su tel es " + tel
  }
  
  var transporter= nodemailer.createTransport ({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
 
  })
  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'  
  })

}) // cierro peticion de post 

module.exports = router;
