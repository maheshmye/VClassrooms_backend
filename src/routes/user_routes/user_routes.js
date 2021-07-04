const express=require("express")
const { signup, signin } = require("../../controllers/user_request/actual_user_routes")


const router=express.Router()


router.post("/user/signup",signup)
router.post("/user/signin",signin)

module.exports=router