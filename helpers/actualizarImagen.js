const fs = require('fs');


const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const borrarImagen = ( path ) => {
    if( fs.existsSync( path ) ){
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


let pathViejo = '';


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch (tipo) {

        case 'medicos':
            const medico = await Medico.findById( id );

            if( !medico ){
                console.log('No existe un medico con ese Id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );
           

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;

        case 'usuarios':

            const usuario = await Usuario.findById( id );

            if( !usuario ){
                console.log('No existe un usuario con ese Id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );
           
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;


        case 'hospitales':

            const hospital = await Hospital.findById( id );

            if( !hospital ){
                console.log('No existe un hospital con ese Id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );
           
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break;

        default:
            console.log('No es un tipo valido');
            return false;
        
    }

}







module.exports = {
    actualizarImagen,
}