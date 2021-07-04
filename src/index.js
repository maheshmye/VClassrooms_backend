require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const session = require('express-session')
const passport=require("passport")
const passportLocalMongoose=require("passport-local-mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")

//routess
const Adminroutes=require("./routes/admin_routes/admin_routes")
const userroutes=require("./routes/user_routes/user_routes")
const logoutroutes=require("./routes/logout/logout")
const rollsRoute=require("./routes/roll_routes/rolls")
const attendenceRoutes=require("./routes/attendence_routes/attendence")
const app=express()

app.use(session({
  secret:"secrets are never reveled",
  resave:false,
  saveUninitialized:false

}))

app.use(passport.initialize())
app.use(passport.session())


//database connections
mongoose.connect("mongodb+srv://mahesh:mahesh@1999@cluster0.x3nnv.mongodb.net/classroom_db?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {console.log("database connected")})


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use("/api",Adminroutes)
app.use("/api",userroutes)
app.use("/api",logoutroutes)
app.use("/api",rollsRoute)
app.use("/api",attendenceRoutes)


app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
})