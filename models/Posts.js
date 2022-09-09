const {Schema,model} = require ('mongoose')

const Post = new Schema({
    article:{type:String,unique:true, required:true},
    description: {type:String,required:true}
})

module.exports = model("Post",Post)