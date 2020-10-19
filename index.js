const express = require('express');
const connection = require('./config/db');
const cors = require('cors');//Se instala con el comando npm i cors y sirve para permitir que las peticiones que esten en diferente dominio como por ejemplo el front-end y el back-end puedan comunicarse sin que chrome mande error

// crear el servidor
const app = express();


// Conectar a la base de datos
connection();

//Habilitar Cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true }));

//Importar Rutas
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/users'));
app.use('/products', require('./routes/products'));

// Puerto de la App
const port = process.env.PORT || 4000;

app.listen(port,'0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})