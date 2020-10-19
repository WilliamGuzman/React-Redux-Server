const User = require('../models/User');
const bcryptjs = require('bcryptjs');//Se instala con el comando npm i bcryptjs
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');//Se instala con el comando npm i jsonwebtoken


exports.createUser = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errors: errores.array() });
    }

    // Extraer email y password
    const { email, password } =  req.body;

    try {

        //Revisar que el usuario registrado sea unico
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ msg: 'This email exist!' });
        }

        //Crear un nuevo usuario
        user = new User(req.body);

        //Encryptar contraseña
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash( password, salt);

        //Guardar usuario
        await user.save();

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
        res.status(400).send("Error!");

    }

}