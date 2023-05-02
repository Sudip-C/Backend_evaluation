const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../Models/UserModel")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
const {email,password,gender,name}=req.body
try {
    bcrypt.hash(password,5,async(err,hash)=>{
        if(hash){
            const user= new UserModel({email,name,gender,password:hash})
            await user.save()
            res.status(200).send({"msg":"New user Added"})
        }else{
            res.status(200).send({"err":err.message})
        }
    })
} catch (error) {
    res.status(400).send({"err":error})
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const loggedUser=await UserModel.findOne({email})
        if(loggedUser){
            bcrypt.compare(password,loggedUser.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({authorId:loggedUser._id,author:loggedUser.name},"eval")
                    res.status(200).send({"msg":"Login successful","Token":token})
                }else{
                    res.status(200).send({"msg":err.message})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":"Wrong credential"})
    }
})






module.exports={
    userRouter
}