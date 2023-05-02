const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
name:{type:String},
email:{type:String},
geneder:{type:String},
password:{type:String}
},{versionKey:false})

const UserModel=mongoose.model("My_User",UserSchema)

module.exports={
    UserModel
}