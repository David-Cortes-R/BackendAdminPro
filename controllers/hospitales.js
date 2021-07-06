const { response } = require('express');
const Hospital = require('../models/hospital'); 



//===========================//==================================
//========          Obtener Hospitales      //=====================
//===========================//==================================
const getHospitales = async (req, res = response ) => {

    const hospitales = await Hospital.find()
                                .populate('usuario', 'nombre email');

    res.json({
        ok: true,
        hospitales
    });

}


//===========================//==================================
//========          crear hospital      //=====================
//===========================//==================================
const crearhospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body 
        });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: 'Hospital Creado',
            hospitalDB
        });    

    }catch(err){

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });

    }
}



//===========================//==================================
//========          Actualizar Hospital      //=====================
//===========================//==================================
const actualizarhospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });

}



//===========================//==================================
//========          Borrar hospital     //=====================
//===========================//==================================
const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    });

}




module.exports = {
    getHospitales,
    crearhospital,
    actualizarhospital,
    borrarHospital,
}