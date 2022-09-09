const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, req.newFilePath +'/avatar')
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+'__'+file.originalname)
    }

})
module.exports = multer({storage})