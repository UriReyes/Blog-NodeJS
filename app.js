'use strict'

//Requires
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar Express
var app = express();
//Cargar Archivos
var user_routes = require('./routes/user');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

//Reescribir Rutas
app.use('/api', user_routes);

//Exportar Módulos
module.exports = app;