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
const actualizarMedico = async (req, res = response) =>{

    const id = req.params.id;
    const uid = req.uid;


    try {

            const medicoDB = await Medico.findById( id );
        
            if( !medicoDB ){
                return res.status(404).json({
                    ok: false,
                    ms: 'No Existe Un medico con ese ID'
                });
            }

            const cambioMedico = {
                ...req.body,
                usuario: uid
            }

            const medicoUpdate =await Medico.findByIdAndUpdate( id, cambioMedico, { new: true } );
        
            res.json({
                ok: true,
                medico: medicoUpdate
            });


        }catch( err ) {

            console.log( err );
            res.status(500).json({
                ok: false,
                msg: 'Error Inesperado hable con el Administrador'
            })
        }



    }




//===========================//==================================
//========          Borrar Medico      //=====================
//===========================//==================================
const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese ID'
            });
        }

        const medicoDelete = await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            medicoDelete
        });


    }catch( err ) {

        console.log( err );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado Hable con el Administrador'
        });
    }

    
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}