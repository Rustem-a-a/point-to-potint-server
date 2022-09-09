const{Schema,model} = require ('mongoose')

const Autos = new Schema({
name:{type:String,required:true},
weight:{type:String,required:true},
height:{type:String,required:true},
length:{type:String,required:true},
width:{type:String,required:true},
volume:{type:String,required:true},
photo:{type:String,required:true}
})
module.exports = model('Autos',Autos)