const express=require("express")
const { PostModel } = require("../Models/PostModel")


const postRoute=express.Router()

postRoute.post("/create",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"New post has been added."})
    } catch (error) {
        res.status(400).send({"err":error.message}) 
    }
})

postRoute.get("/",async(req,res)=>{
try {
    const post=await PostModel.find({authorId:req.body.authorId})
    res.status(200).send(post)
} catch (error) {
    res.status(400).send({"err":error.message})
}
})


postRoute.patch("/update/:postId",async(req,res)=>{
    const {postId}=req.params
    const post= await PostModel.findOne({_id:postId})
    try {
        if(req.body.authorId!==post.authorId){
            res.status(200).send({"msg":"You are not Authorised. Login First"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postId},req.body)
            res.status(200).send({"msg":`Note with id ${postId} has been updated`})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }

})

postRoute.delete("/delete/:postId",async(req,res)=>{
    const {postId}=req.params
    const post= await PostModel.findOne({_id:postId})
    try {
        if(req.body.authorId!==post.authorId){
            res.status(200).send({"msg":"You are not Authorised. Login First"})
        }else{
            await PostModel.findByIdAndDelete({_id:postId})
            res.status(200).send({"msg":`Note with id ${postId} has been deleted`})
        }
    } catch (error) {
        res.status(400).send({"err":error.message})
    }

})


module.exports={
    postRoute
}