const User = require('../models/User')
const Role = require('../models/Role')
const Post =  require('../models/Posts')
const Autos = require('../models/Auto')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require ('jsonwebtoken')
const mongoose = require('mongoose')
const {secret} = require('config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret,{expiresIn: '1h'})
}

class authController{

    async registration(req,res){
        try{
            const errors = validationResult(req)
                     if(!errors.isEmpty()){return res.status(400).json({message:'error registration!',errors})}
            const {username,password} = req.body
            const candidate =await User.findOne({username})
                     if(candidate){return res.json({message: 'User with this name already created'})}
            const hashPassword = bcrypt.hashSync(password,7)
            const userRole =await Role.findOne({value:'USER'})
            const user = new User({username, password: hashPassword, roles:[userRole.value]})
            await user.save()
            console.log(user)
            const token = generateAccessToken(user._id,user.roles,user.username)
            return res.json({message: 'User is created',
            token,
            user})
        }
        catch (e){
            console.log(e)
            res.status(400).json({message:'Registration error'})
        }
    }


    async login(req,res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
                    if (!user) {return res.status(400).json({message: 'User with this name is not registered'})}
            const validPassword = bcrypt.compareSync(password, user.password)
                    if (!validPassword) {return res.status(400).json({message: 'Uncorrect password'})}
            const token = generateAccessToken(user._id,user.roles,user.username)
            return res.json({
                token,
                user:{
                    id:user._id,
                    name: user.username,
                    role:user.roles
                }})
        }
        catch (e){
            console.log(e)
        }
    }


    async auth(req,res){
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = generateAccessToken(user._id,user.roles)
            return res.json({
                token,
                user
            })
        }
        catch (e){
            console.log(e)
        }
    }



    // async autos(req,res){
    //
    //     try {
    //         const infoAutos = await Autos.find()
    //         return res.json(infoAutos)
    //
    //     }
    //     catch (e){
    //         res.status(400).json({message: 'photo is not found'})
    //     }
    // }





//     async users(req,res){
//         try{
//             const users = await User.find()
//             return res.json(users)
//         }
//         catch (e){
//             console.log(e)
//         }
//     }
//
//     async posts(req,res){
//        try {
//            const {article,description} = req.body
//            const post = new Post({article,description})
//            await post.save()
//            return res.json({message:'aticle was created'})
//        }
//       catch (e){
//           console.log(e)
//           res.status(400).json(`Error ${e}`)
//       }
// }
}

module.exports = new authController()