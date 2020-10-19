//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');//Permite agregar validaciones a los campos requeridos, se instala con npm i express-validator

//Create User
router.post('/', 

    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must be at least 6 characters!').isLength({ min: 6}),
    ],

    userController.createUser
);

module.exports = router;