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



// Directorio Publico
app.use( express.static('public') );



// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/uploads', require('./routes/uploads') );

app.use( '/api/login', require('./routes/auth') );






app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto: ', process.env.PORT );
})