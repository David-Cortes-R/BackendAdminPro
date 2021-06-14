require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');



// Crear el Servidor de Express
const app = express();


// Configuracion del CORS
app.use(cors());


// Base de Datos
dbConnection();


// Rutas
app.get( '/', ( req, res ) => {     
    res.json({
        ok: true,
        msg: 'Hola DavidMessi'
    });

})





app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto: ', process.env.PORT );
})