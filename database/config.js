const mongoose = require('mongoose');


// Mongo_Atlas
// Usuario: mean_user
// Clave: 80eGdFeGyhwMsQSj


const dbConnection = async () => {

    try{

        await mongoose.connect( process.env.DB_CNN,  
        { 
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          useCreateIndex: true
        });

        console.log('Base de Datos Exitosa');

    }catch( err ){
        console.log('Error: ', err );
        throw new Error('Error al levantar la Base de Datos');
    }

}

module.exports = {
    dbConnection,
}