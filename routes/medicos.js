/*
    Ruta
    /api/medicos
*/

const { Router } = require('express');
const  { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');


const router = Router();



router.get( '/', validarJWT, getMedicos );


router.post( '/',
    [
        validarJWT,
        check('nombre', 'El Nombre es Necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser Valido.').isMongoId(),
        validarCampos
    ],
     crearMedico 
);


router.put( '/:id', actualizarMedico );


router.delete( '/:id', borrarMedico );





module.exports = router;


