const express=require("express")
const {present,absent, getAttendence } = require("../../controllers/attendence/attendence")


const router=express.Router()

router.post("/present",present)
router.post("/absent",absent)
router.get("/presenties",getAttendence)


module.exports=router