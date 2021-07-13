const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizarImagen');






const fileUploads = (req, res = response) => { 

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Validar Tipo
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if( !tiposValidos.includes( tipo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medicos, hospitales, o usuarios (tipo)'
        });
    }


    // Validar que Exista un Archivo
    if( !req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }



    // Procesar una Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[ nombreCortado.length - 1 ];


    // Validar Extencion
    const extencionesValidas = ['png', 'jpg', 'jpge', 'gif'];
    if( !extencionesValidas.includes( extencionArchivo ) ){
        return res.status(400).json({
            ok: false,
            msg: `No es una Extencion valida las extenciones son: ${ extencionesValidas.join(', ')} `
        });
    }


    // Generar el nombre del Archivo
    const nombreArchivo = `${ uuidv4() }.${ extencionArchivo }`;


    //  Path para Guardar la Imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la Imagen
    file.mv( path, ( err ) => {
        if( err ){
            console.log( err );
            return res.status(500).json({
                ok: false,
                msg: 'Error al Mover la imagen'
            });
        }

        // Actualizar Base de Datoss
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        });

    })
}




const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);


    if( fs.existsSync( pathImagen ) ){
        res.sendFile( pathImagen );
    }else{
        const pathImagen = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImagen );
    }

}




module.exports = {
    fileUploads,
    retornaImagen,
}