const mongoose=require("mongoose")

const RollSchema=new mongoose.Schema({
    cse:[{type:String}],
    it:[{type:String}]
})

module.exports=mongoose.model("rollno",RollSchema)


