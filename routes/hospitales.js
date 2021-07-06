
/*
    Ruta
    /api/hospitales
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearhospital, actualizarhospital, borrarHospital } = require('../controllers/hospitales');


const router = Router();




router.get( '/', validarJWT,  getHospitales );


router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El Nombre es Necesario').not().isEmpty(),
        validarCampos
    ],
    crearhospital );


router.put( '/:id', actualizarhospital );


router.delete( '/:id', borrarHospital );






module.exports = router;


