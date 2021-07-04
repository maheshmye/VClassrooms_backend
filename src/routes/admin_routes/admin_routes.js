const express=require("express")
const { signup, signin,getuser } = require("../../controllers/admin_request/actual_admin_routes")

const router=express.Router()



router.post("/Admin/signup",signup)
router.post("/Admin/signin",signin)
router.get("/getuserdetails",getuser)

module.exports=router