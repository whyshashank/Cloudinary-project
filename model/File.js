const mongoose= require("mongoose")
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
         type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

fileSchema.post("save",async function(doc){
    try{
    console.log("Doc",doc)

    //transporter

    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })

    let info = await transporter.sendMail({
        from:`sheshnag`,
        to: doc.email,
        subject:"new file uploaded",
        html:`<h2>done buddy backend khatam iske sath</h2>  <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
    })

    console.log("INFO",info)
    }
    catch(error){
  console.log(error)
  console.error(error)
    }
})
module.exports= mongoose.model("File",fileSchema)