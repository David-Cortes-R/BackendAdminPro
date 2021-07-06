const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




//===========================//==================================
//========          Obtener Usuarios      //=====================
//===========================//==================================
const getUsuarios = async( req, res ) => {

     const desde = Number(req.query.desde) || 0;

     const [ usuarios, total ] = await Promise.all([
        
        Usuario
            .find({}, 'nombre email google role' )
            .skip( desde )
            .limit( 5 ),

            Usuario.countDocuments()
     ]);


    res.json({
        ok: true,
        total,
        usuarios,
        uid: req.uid
    });
}



//===========================//==================================
//========          Crear Usuarios      //=====================
//===========================//==================================
const crearUsuario = async( req, res = response ) => {

    const { password, email } = req.body;
    

    try{

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El Correo ya Existe'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // Guardar Usuario
        await usuario.save();

        // Generar Token
        const token = await generarJWT( usuario.id, usuario.nombre );

        res.json({
            ok: true,
            msg: 'Usuario Creado',
            usuario,
            token
        });

    } catch ( err ){
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, Consultar logs...'
        });
    }
   
}



//===========================//==================================
//========          Actualizar Usuarios      //==================
//===========================//==================================
const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            });
        }

        // Actualizar Usuario
        const campos = req.body;

        if( usuarioDB.email === req.body.email ){
            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya Existe un usuario con ese Email'
                });
            }
        }

        delete campos.password;
        delete campos.google;


    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

        res.json({
            ok: true,
            msg: 'Usuario Actualizado',
            usuario: usuarioActualizado
        });


    }catch ( err ){
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}




//===========================//==================================
//========         Borrar Usuarios      //=====================
//===========================//==================================
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No Existe ese Id en la Base de Datos'
            })
        }

        
        await Usuario.findByIdAndDelete( uid );


        res.json({
            ok: true,
            msg: 'Usuario Eliminado',
            uid
        })


        
    }catch (err){
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}






module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}