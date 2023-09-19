const mongoose = require("mongoose")

require("dotenv").config();

const dbconnect =()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("db connected")}).catch((e)=>{console.log("Some error with db connecting")})
}

module.exports=dbconnect