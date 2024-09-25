const jwt = require('jsonwebtoken');
const {JWT_ADMIN_SECRET} = require('../config');

function adminMiddleware (req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: 'user not found'
        })
    }
}

module.exports = {
    adminMiddleware,
}