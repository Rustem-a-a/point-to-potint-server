const express = require('express')
const fileMidellware = require('../middelware/fileMiddelware')
const Router = require('express')
const avatarMiddelware = require('../middelware/avatarMiddelware')

const router = new Router()

router.post('/saveSingleFile',
    fileMidellware.single('saveImage'),
    (req,res)=>
    {
        console.log(req.file)
        res.json(req.file)
})

router.post('/saveMultipleFiles',
    fileMidellware.array('saveImages',5),
    (req,res)=>
    {
        console.log(req.files)
        res.send('multiple all right')
})

router.post('/avatar',avatarMiddelware.single('avatar'),(req,res)=>
{
        res.json(req.file)
})
module.exports = router