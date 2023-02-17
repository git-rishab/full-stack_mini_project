const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    email:String,
    password:String,
    location:String,
    DOB:String,
    role:String
},{
    versionKey:false
})

const UserModel = mongoose.model("userData",userSchema);

module.exports = {
    UserModel
}