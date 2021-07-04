const RollDb=require("/v_classrooms/backend/src/database_modules/rollno_schema")

exports.Rollschemas=((req,res) => {
    const CSE=new RollDb({
        cse:["18241A12C1","18241A12C2","18241A12C3","18241A12C4","18241A12C5","18241A12C6","18241A12C7"],
        it:["18241A12C7","18241A12C8","18241A12C9","18241A12D0","18241A12D1","18241A12D2"]
    })

    
    CSE.save((err,user) =>{
        console.log("check properly")
        if(err){
            res.status(400).json({msg:err})
        }
        if(user){
            res.status(200).json({msg:"roll saved"})
        }
    })

    
})

