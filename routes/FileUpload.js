const express = require("express")

const router = express.Router()

const {localFileUpload,imageUpload,videoUpload, reduceImageUpload} = require("../controllers/fileUpload.js")

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/reduceImageUpload",reduceImageUpload)

module.exports= router