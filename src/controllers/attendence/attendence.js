const express=require("express")

const adminDB=require("/v_classrooms/backend/src/database_modules/admin_models/userschema")

exports.present=((req,res) =>{
    adminDB.findOne({username:req.body.roll}).exec((Err,data) =>{
        if(Err){
            console.log({msg:Err})
        }
        else{
            console.log(data)
        }
    })

    adminDB.updateOne({username:req.body.roll},{$push:{attendence:1}}).exec((err,data) => {
            console.log(req.body.roll)
             if(err){
                 res.status(400).json({msg:"err"})
             }
             else{
                 console.log("updated")
                 res.status(200).json({msg:data})
             }
    })

})

exports.absent=((req,res) =>{

    adminDB.updateOne({username:req.body.roll},{$push:{attendence:0}}).exec((err,data) => {
             if(err){
                 res.status(400).json({msg:"err"})
             }
             else{
                 res.status(200).json({msg:data})
             }
    })

})

exports.getAttendence=(req,res) =>{
    adminDB.findOne({username:req.body.rollno}).exec((err,data) =>{
        console.log(req.body.rollno)
        if(!data){
            return res.status(401).json({msg:"student doestnt exist"})
        }
        else{
           return res.status(200).json({msg:data.attendence})
        }
    })
}





