const express=require("express")
const jwt=require("jsonwebtoken");
const passport = require("passport");

const adminDB=require("/v_classrooms/backend/src/database_modules/admin_models/userschema")
const rollDB=require("/v_classrooms/backend/src/database_modules/rollno_schema")

passport.use(adminDB.createStrategy());

passport.serializeUser(adminDB.serializeUser());
passport.deserializeUser(adminDB.deserializeUser());


var current_user=""
exports.signup=((req,res) => {
    const {Name,username,RegisterPassword,Branch,Section,Year}=req.body
    // const admins=new adminDB({
    // Firstname,
    // Lastname,
    // username,
    // Branch, 
    // Section,
    // attendence:[1,0]         
    // })
    // console.log(req.body.Firstname)
    if(req.body.Branch=="cse"){

    rollDB.findOne({cse:req.body.username}).exec((err,rollno)=>{
        var access=0
        if(!rollno){
           return  res.status(400).json({msg:"you doesnot belongs to this class"})
        }
        if(rollno){
            adminDB.register({username:req.body.username,Name,Branch,Section,Year},req.body.password,function(err,data){
                // console.log(req.body.username)
                if(err){
                    return res.status(400).json({msg:"admin alredy exist",messages:req.body.username,access})
                }
                else{
                    passport.authenticate("local")(req,res,function(){
                        console.log("enter auth")
                        // console.log(req.user.Firstname)
                        current_user=req.body.Name
                        if(req.body.username.length==11)
                        {
                        access=2
                    }
                        else
                        {
                        access=1
                    }
                        var section=req.body.Section
                        var branch=req.body.Branch
                        var  current_user_attendence=req.user.attendence
                        var year=req.body.Year
                        console.log(req.body.username)
                        const token=jwt.sign({},"v_classrooms",{expiresIn:'2h'})
                        // console.log(current_user)
                        console.log("redirect not working")
                         return res.status(200).json({msg:"admin saved successfully",token,current_user,current_user_attendence,year,access,section,branch})
                        // res.redirect("/home")
                        
                    })
                }
            })}})}

        
    else if(req.body.Branch=="it"){
        rollDB.findOne({it:req.body.username}).exec((err,rollno)=>{
            var access=0
            if(!rollno){
                return res.status(400).json({msg:"you doesnt belongs to this class"})
            }
            if(rollno){
                adminDB.register({username:req.body.username,Name,Branch,Section,Year},req.body.password,function(err,data){
                    
                    if(err){
                       return res.status(400).json({msg:"admin already exists",messages:req.body.username})
                    }
                    else{
                        passport.authenticate("local")(req,res,function(){
                            current_user=req.body.Name
                            if(req.body.username.length==11)
                            {
                            access=2
                        }
                            else
                            {
                            access=1
                        }
                            var section=req.body.Section
                            var branch=req.body.Branch
                            var  current_user_attendence=req.user.attendence
                            var year=req.body.Year
                            const token=jwt.sign({},"v_classrooms",{expiresIn:'2h'})
                            return res.status(200).json({msg:"admin saved successfully",token,current_user,current_user_attendence,year,access,section,branch})
                            
                            
                        })
                    }
                
})}
        })}

    else{
        console.log("req.body.Branch")
    return res.status(400).json({msg:"enter a valid branch"})



    
}
console.log(current_user)

    

})




// exports.signup=((req,res) =>{
//     adminDB.findOne({Email:req.body.Email}).exec((error,user)=>{
//            if(error){
//                res.status(400).json({error:error})
//            }
//            if(user){
//                res.status(400).json({msg:"admin already exists"})
//            }
//            if(!user){
//                const {Firstname,Lastname,Email,password,role}=req.body

//                const admins=new adminDB({
//                 Firstname,
//                 Lastname,
//                 Email,
//                 password,
//                 role,
                
//                })
            
//             admins.save((error,user) => {
//                 if(error){
//                     res.status(400).json({msg:error})
//                 }
//                 if(user){
//                     res.status(200).json({msg:"admin successfully registered",
//                 data:user})
//                 }
                
//             })}
            
//     })
    
// })
// exports.signin=((req,res) => {
//     adminDB.findOne({Email:req.body.Email}).exec((error,user) =>{
//         if(error){
//             res.status(400).json({err:error})
//         }
//         if(!user){
//             res.status(400).json({msg:"admin doesn't exist"})
//         }
//         // if(user.role=="user"){
//         //     res.status(200).json({msg:"somethoing is wrong"})
//         // }  
//         if(user){
//             //console.log(user.authenticate(req.body.password))
//            if((user.authenticate(req.body.password) && user.role=="admin")){
//                const token=jwt.sign({_id:user._id,role:user.role},"v_classrooms",{expiresIn:'2h'})
//                res.status(200).json({msg:user,token})
//            }
           
//         }
//     })
// })

exports.signin=((req,res) =>{
    var access=0
    const admins=new adminDB({
        username:req.body.username,
        password:req.body.password
        
    })
    
    
    req.login(admins,function(err,data){
        if(err){
            console.log("enter error")
            res.status(400).json({msg:"Invalid credentials"})
        }
        else{
            
            console.log("check here")
            passport.authenticate("local")(req,res,function(){
                if(req.body.username.length==11)
                {
                access=2
            }
                else
                {
                access=1
            }
                console.log("successfull login")
                var section=req.user.Section
                var branch=req.user.Branch
                var year=req.user.Year
                current_user=req.user.Name
                var  current_user_attendence=req.user.attendence
                console.log(current_user,current_user_attendence)
                const token=jwt.sign({_id:req.user._id,username:req.user.username},"v_classrooms",{expiresIn:'2h'})
               return res.status(200).json({msg:"successfully loggedin",token:token,section,branch,current_user_attendence,year,access,current_user})
            })
        }

        
    })
})

exports.getuser=(req,res)=>{
    console.log(req.user)
    res.json(req.user)
}