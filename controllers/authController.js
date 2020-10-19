const User = require('../models/User');
const bcryptjs = require('bcryptjs');//Se instala con el comando npm i bcryptjs
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');//Se instala con el comando npm i jsonwebtoken

exports.authUser = async ( req, res ) => {
    
    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email , password } = req.body;

    try {
        

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not Found!'});
        }

        //Revisar el password
        const passEmail = await bcryptjs.compare(password, user.password);
        if (!passEmail) {
            return res.status(400).json({ msg: 'Password is Incorrect!' });
        }

        //Si todo esta correcto Crear el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.JWT_SECRETKEY, {
            expiresIn: 7200 //2 hora
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

exports.authenticateUser = async ( req, res ) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ auth: true });
    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' });
    }
}