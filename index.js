const express = require("express")

const app  = express()

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())

const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

const db =require("./config/database.js")
db()

const cloudinary=  require("./config/cloudinary.js")
cloudinary.cloudinaryConnect()

const Upload= require("./routes/FileUpload.js")
app.use("/api/v1/upload",Upload)

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})
