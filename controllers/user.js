'use strict';

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt');

var controller = {
    probando: function (req, res) {
        return res.status(200).send({
            message: 'Soy el método probando'
        });
    },
    testeando: function (req, res) {
        return res.status(200).send({
            message: 'Soy el método testeando'
        });
    },
    save: function (req, res) {
        //Recoger los parametros de la petición
        var request = req.body;
        //Validar los datos
        var validate_name = !validator.isEmpty(request.name);
        var validate_surname = !validator.isEmpty(request.surname);
        var validate_email = !validator.isEmpty(request.email) && validator.isEmail(request.email);
        var validate_password = !validator.isEmpty(request.password);
        if (validate_name && validate_surname && validate_email && validate_password) {
            //Crear objeto del usuario
            var user = new User();
            //Asignar valores al usuario
            user.name = request.name;
            user.surname = request.surname;
            user.email = request.email.toLowerCase();
            user.rol = 'ROLE_USER';
            user.image = null;
            //Comprobar si el usuario ya existe
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al comprobar duplicidad del usuario'
                    })
                }
                //Si no existe,
                if (!issetUser) {
                    //Cifrar contraseña
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) {
                            return res.status(500).send({
                                message: 'Error al generar password hash'
                            });
                        } else {
                            // Store hash in your password DB.
                            bcrypt.hash(request.password, salt, (err, hash) => {
                                if (err) {
                                    return res.status(500).send({
                                        message: 'Error al obtener password Hash'
                                    })
                                } else {
                                    user.password = hash;
                                    //Guardar usuario
                                    user.save((err, userStored) => {
                                        if (err) {
                                            return res.status(500).send({
                                                message: 'Error al guardar usuario'
                                            });
                                        }

                                        if (!userStored) {
                                            return res.status(500).send({
                                                message: 'El usuario no se ha guardado'
                                            });
                                        } else {
                                            //Devolver respuesta        
                                            return res.status(200).send({ status: 'success', user: userStored });
                                        }
                                    });//Close save
                                }
                            });//close bcrypt
                        }
                    });
                } else {
                    return res.status(500).send({
                        message: 'El usuario ya está registrado'
                    })
                }
            });
        } else {
            return res.status(200).send({
                message: 'Validación de los datos del usuario es incorrecta, intente nuevamente',
            });
        }

    }
}

module.exports = controller;