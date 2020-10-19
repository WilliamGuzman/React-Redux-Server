const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });//Nos permite leer las variables de entorno de un archivo, en este caso .env

const connection = async () => {

    try {
        
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }); //Lee el valor de la variable con la cadena de conexion que se encuentra en el archivo .env
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la APP
    }

}

module.exports = connection;