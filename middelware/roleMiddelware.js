// const jwt = require('jsonwebtoken')
// const {secret} = require('../config/default.json')
//
//
// module.exports =function (roles) {
//
//     return function (req, res, next) {
//         if (req.method === "OPTIONS") {
//             return next()
//         }
//         try {
//             const token = req.headers.authorization.split(' ')[1]
//             if (!token) {
//                 res.status(403).json({message: 'User is unregister'})
//             }
//             // const decodedData = jwt.verify(token, secret)
//             // req.user = decodedData
//             const{roles:userRoles} = jwt.verify(token,secret)
//             let hasRoles = false
//             userRoles.forEach((role)=>{
//                 if(roles.includes(role)){
//                     hasRoles = true
//                 }
//             })
//             if (!hasRoles){res.status(403).json({message: 'You have not in'})}
//             next()
//
//         } catch (e) {
//             res.status(403).json({message: 'User is unregister'})
//         }
//     }
// }