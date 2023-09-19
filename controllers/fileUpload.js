const File = require("../model/File.js")
const cloudinary = require("cloudinary").v2

//handler functions

exports.localFileUpload = async (req,res)=>{
    try{
       const file = req.files.file;
       console.log("File ->",file)

       let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}` 
       console.log("PATH->",path)

       file.mv(path, (err)=>{
   console.log(err)
       })

       res.json({
        success:true,
        message:"local file uploaded succesfully"
       })
    }

    
    catch(error){
   console.log(error)
    }
}


function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file,folder,quality){
    const options ={folder}

    if(quality){
        options.quality=quality
    }
    options.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath,options)
}
//image upload to handler
exports.imageUpload= async (req,res)=>{
    try{
    const {name,email,tags} = req.body
    console.log(name,email,tags)

    const file = req.files.file
    console.log(file)

    //validation
    const supportedTypes = ["jpg","jpeg","png"]
    const fileType = file.name.split('.')[1].toLowerCase()
   

    if(!isFileTypeSupported(fileType,supportedTypes)){
       return res.status(400).json({
        success:false,
        message:"File format not supported"
       })
    }

    console.log("hi")
    const response = await uploadFileToCloudinary(file,"Shashank")
   console.log(response)
   
   const fileData =  await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url
   })


   res.json({
    success:true,
    imageUrl:response.secure_url,
    message:"Image uploaded successfully"
   })
    }
   catch(error){
  console.log(error)
  res.status(400).json({
    success:false,
    mesaage:"something went wrong"
  })
   }
}

exports.videoUpload = async (req,res)=>{
   try{
  const {name,tags,email} = req.body
   
  console.log(name,tags,email)

  const file = req.files.videofile

  const supportedTypes =["mp4","mov"]
  const fileType =file.name.split(".")[1].toLowerCase()
   console.log("File Type", fileType)


   //TOD add a upperlimt of 5mb//
   if(!isFileTypeSupported(fileType,supportedTypes)){
    return res.status(400).json({
        success:false,
        message:"File not supported "
    })
   }
   const response = await uploadFileToCloudinary(file,"Shashank")
   console.log(response)

   const fileData =  await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url
   })

   res.json({
    success:true,
    imageUrl:response.secure_url,
    message:"Video uploaded successfully"
   })

   }
   catch(error){
    console.log(error)
    res.status(400).json({
      success:false,
      mesaage:"something went wrong"
    })
     }
}

exports.reduceImageUpload= async (req,res)=>{
    try{
    const {name,email,tags} = req.body
    console.log(name,email,tags)

    const file = req.files.file
    console.log(file)

    //validation
    const supportedTypes = ["jpg","jpeg","png"]
    const fileType = file.name.split('.')[1].toLowerCase()
   

    if(!isFileTypeSupported(fileType,supportedTypes)){
       return res.status(400).json({
        success:false,
        message:"File format not supported"
       })
    }

    console.log("hi")
    const response = await uploadFileToCloudinary(file,"Shashank",30)
   console.log(response)
   
   const fileData =  await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url
   })


   res.json({
    success:true,
    imageUrl:response.secure_url,
    message:"Image uploaded successfully"
   })
    }
   catch(error){
  console.log(error)
  res.status(400).json({
    success:false,
    mesaage:"something went wrong"
  })
   }
}