const { default: mongoose, models, model } = require("mongoose");


const taskSchema = new mongoose.Schema({
    hour : {type:"string"},
    date : {type : "string"},
})

const userSchema = new mongoose.Schema({
    name:{type:"String"} , 
    password:{type:"String"},
    tasks : {type:[taskSchema]}
})

const userModel = models.user || model('user' , userSchema)

export default userModel