const { response }  = require('express');
const Medico = require('../models/medico');



//===========================//==================================
//========          Obtener Medicos      //=====================
//===========================//==================================
const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}



//===========================//==================================
//========          Crear Medico      //=====================
//===========================//==================================
const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            msg: 'Medico Creado',
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



//===========================//==================================
//========          Actualizar Medico      //=====================
//===========================//==================================
const actualizarMedico = (req, res = response) =>{

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}



//===========================//==================================
//========          Borrar Medico      //=====================
//===========================//==================================
const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}