const express=require("express")
const { Rollschemas } = require("../../controllers/rollnos/roll_nos")

const router=express.Router()



router.post("/rollnos",Rollschemas)


module.exports=router