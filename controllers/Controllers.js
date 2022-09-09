const Autos = require("../models/Auto");


class Controllers{
    async autos(req,res){

    try {
        const infoAutos = await Autos.find()
        return res.json(infoAutos)
    }
    catch (e){
        res.status(400).json({message: 'photo is not found'})
    }
}


}



module.exports = new Controllers()