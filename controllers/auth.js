
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



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








module.exports = {
    login,
}