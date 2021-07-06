const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');




const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regexp = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([

        Usuario.find({ nombre: regexp }),
        Medico.find({ nombre: regexp }),
        Hospital.find({ nombre: regexp })
    ]);


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });

} 



const getTablaColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp =  new RegExp( busqueda, 'i' );

    let data = [];

    switch( tabla ){

        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });
        break;

        case 'medicos':
            data = await Medico.find({ nombre: regexp })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre, img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regexp })
                                    .populate('usuario', 'nombre img');
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser medicos/usuarios/hospitales'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

}







module.exports = {
    getTodo,
    getTablaColeccion,
}