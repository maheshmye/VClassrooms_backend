const mongoose=require("mongoose")
// const bcrypt=require("bcrypt")
const passportLocalMongoose=require("passport-local-mongoose")

const Databaseschema=new mongoose.Schema({
    Name:{
        type:String,
        require:true,
        min:3,
        max:25
    },
    // Lastname:{
    //     type:String,
    //     require:true,
    //     min:3,
    //     max:25
    // },
    
    username:{
        type:String,
        require:true,
        unique:true
        
    },
    
    Password:{
        type:String,
        require:true
    },
    Branch:{
        type:String,
        require:true
    },
    Section:{
        type:String,
        require:true

    },
    attendence:[{
         type:Number}],
    Year:{
        type:Number

    }
    
})

Databaseschema.plugin(passportLocalMongoose)

module.exports=mongoose.model("Admin",Databaseschema)

// adminschema.virtual("password").set(function(password){
//     this.Admin_Password=bcrypt.hashSync(password,10)
// })



// adminschema.methods={
//     authenticate: async function(password){
//         const match=await bcrypt.compareSync(password,this.Admin_Password)
//         return match
//     }
// }




// Username:{
    //     type:String
    // },

// Username:{
    //     type:String,
    //     require:true
    // },

// role:{
    //     type:String,
    //     enum:['admin','user'],
    //     default:'user'
    // }