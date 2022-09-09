const Router = require('express')
const controller = require('../controllers/authController')
const {check} = require("express-validator");
const authMiddelware = require('../middelware/authMiddleware')
const roleMiddelware = require('../middelware/roleMiddelware')
const authUserMiddleware = require('../middelware/authUserMiddleware')
const Controllers = require('../controllers/Controllers')
const User = require('../models/User')

const router = new Router()

router.post('/registration',[
    check('username', 'must be full').notEmpty(),
    check('password', 'password min 5 max 10').isLength({min:5,max:10})
], controller.registration)

router.post('/login',controller.login)

router.get('/auth',authUserMiddleware,controller.auth)

router.get('/auto',Controllers.autos)

router.patch('/change/:id', async (req,res)=>{
    const _id= req.params.id
    const user = await User.findByIdAndUpdate(_id,req.body)
    res.status(200).json({message: user})
})

router.post('/avatar',async (req,res)=>{
    const {_id} = req.body
    const user = await User.findById(_id)
    return res.json({message:user.avatar})
})


module.exports = router