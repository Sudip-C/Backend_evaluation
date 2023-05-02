const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    title:{type:String},
    body:{type:String},
    device:{type:String},
    authorId:{type:String},
    author:{type:String}
},{
    versionKey:false
})

const PostModel= mongoose.model("Post",PostSchema)

module.exports={
    PostModel
}