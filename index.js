const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/authRouter')
const fileRouter = require('./routes/fileRouter')
const cors = require('cors')
const app = express()
const path = require('path')
const newPath = require('./middelware/path.middelware')
const PORT = process.env.PORT || config.get('serverPort')

app.use(cors())
app.use(newPath(path.resolve(__dirname,'images')))
app.use(express.json())
app.use('/api', fileRouter)
app.use("/auth", authRouter)
app.use('/avatar', express.static(path.join(__dirname, 'images', 'avatar')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/UIImages', express.static(path.join(__dirname, 'images', 'UIImages')))

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
