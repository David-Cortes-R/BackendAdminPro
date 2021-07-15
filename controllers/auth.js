
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');



const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try{

        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no Encontrado'
            });
        }


        // Verificar Password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no Validad'
            });
        }


        // Generar Token-JWT
        const token = await generarJWT( usuarioDB.id, usuarioDB.nombre );

        res.json({
            ok: true,
            token
        });


    } catch(err){
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Hable con e Administrador'
        })
    }
}





const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;


    try {

        const { name, email, picture } = await googleVerify( googleToken );
        let usuario;

         const usuarioDB = await Usuario.findOne({ email });
         if( !usuarioDB ){
            usuario = new Usuario({
                 nombre: name,
                 email,
                 password: ':)',
                 img: picture,
                 google: true
             });
         }else{
             usuario = usuarioDB;
             usuario.google = true;
            //  usuario.password = ':)'
         }

        //  Guardar en Base de Datos
         await usuario.save();

        //  Generar el Token
        const token = await generarJWT( usuarioDB.id, usuarioDB.nombre );

        res.json({
            ok: true,
            msg: 'Servicio de Google Sign-In',
            token
        });

    }catch( err ) {

        return res.status(401).json({
            ok: false,
            msg: 'El Token no es Valido'
        });

    }
}



const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    // Generar el Token - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token
    })

}







module.exports = {
    login,
    googleSignIn,
    renewToken
}