const express=require("express")
const { logout } = require("../../controllers/Logout/logout")
const router=express.Router()

router.post("/logout",logout)

module.exports=router