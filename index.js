require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');



// Crear el Servidor de Express
const app = express();


// Configuracion del CORS
app.use(cors());


// Lectura y Parseo del Body
app.use( express.json() );



// Base de Datos
dbConnection();



// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );








app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto: ', process.env.PORT );
})