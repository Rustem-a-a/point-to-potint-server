
function newPath(path){
    return function (req,res,next) {
        req.newFilePath = path
        next()
    }
}

module.exports = newPath