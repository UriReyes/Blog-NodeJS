'use strict';

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

//Rutas prueba
router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);

//Rutas usuarios
router.post('/register', UserController.save);

module.exports = router;