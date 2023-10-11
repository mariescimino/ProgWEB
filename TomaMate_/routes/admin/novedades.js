var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel')

router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades()

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades

  });
});

//   para eliminar

router.get('/eliminar/:id', async (req, res, next) => {
  const id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
})



router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
})

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.producto != "" && req.body.cantidad != "" && req.body.precio != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'todos los campos son requeridos'
      })
    }

  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })
  }

})

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

router.post('/modificar', async (req, res, next) => {
  try {
  
  var id= req.body.id
  console.log(req.body.id);
  var obj = {
      producto: req.body.producto,
      cantidad: req.body.cantidad,
      precio: req.body.precio
    }

    console.log(obj)

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    
    res.redirect('/admin/novedades');
  } catch (error) { 
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'no se modifico la novedad'
    })
  }
})


module.exports = router;
