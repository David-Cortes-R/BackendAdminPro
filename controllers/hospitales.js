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
const actualizarhospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;


    try {

        const hospital  = await Hospital.findById( id );

        if( !hospital ){
            return res.status(404).json({
                ok: false,
                msg: 'no Existe un hospital por ese ID'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    


    } catch(err) {
        console.log( err );

        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un Error hable con el Administrador'
        })
    }
}



//===========================//==================================
//========          Borrar hospital     //=====================
//===========================//==================================
const borrarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ){
            res.status(404).json({
                ok: false,
                msg: 'No Existe Un Hospital Con Ese ID.'
            });
        }


        const hospitalDelete = await Hospital.findByIdAndDelete( id );
        
        res.json({
            ok: true,
            msg: 'Hospital Eliminado',
            hospitalDelete
        });
    



    }catch(err) {
        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

}




module.exports = {
    getHospitales,
    crearhospital,
    actualizarhospital,
    borrarHospital,
}