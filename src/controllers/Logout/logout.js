const express=require("express")
const passport=require("passport")


const adminDB=require("/v_classrooms/backend/src/database_modules/admin_models/userschema")

passport.use(adminDB.createStrategy());

passport.serializeUser(adminDB.serializeUser());
passport.deserializeUser(adminDB.deserializeUser());


exports.logout=((req,res) =>{
    req.logout()
    res.status(200).json({msg:"successfully loged out"})
})
