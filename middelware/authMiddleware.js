const jwt = require('jsonwebtoken')
const {secret} = require('../config/default.json')

module.exports = function (req,res,next){
    if(req.method === "OPTIONS"){
        return next()
    }
    try{
const token = req.headers.authorization.split(' ')[1]
        if (!token){res.status(403).json({message: 'User is unregister'})}
                const decodedData = jwt.verify(token, secret)
            req.user = decodedData
    next()

    }
    catch (e) { res.status(403).json({message: 'User is unregister'})
    }
}