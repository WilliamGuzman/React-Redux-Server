const jwt = require('jsonwebtoken');

module.exports = function( req, res, next) {
    //Leer el token del header
    const token = req.headers.authorization; //En cada request se tiene que enviar

    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No token, invalid permission' })
    }

    //Validar el token
    try {
        const encryption = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = encryption.user;
        next();//Se va al siguiente middleware si este existe
    } catch (error) {
        res.status(401).json({smg: 'Invalid Token'});
    }
}