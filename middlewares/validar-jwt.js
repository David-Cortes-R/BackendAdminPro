const jwt = require('jsonwebtoken');



const validarJWT = ( req, res, next ) => {

    // Leer Token
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try{

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

    }catch( err ){
        console.log( err );
        return res.status(401).json({
            ok: false,
            msg: 'Token no Valido'
        });
    }

}










module.exports = {
    validarJWT,
}