const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{

const token=req.headers.authorization
if(token){
    try {
        const decodedToken=jwt.verify(token.split(" ")[1],"eval")

        if(decodedToken){
            req.body.authorId=decodedToken.authorId
            req.body.author=decodedToken.author
            next()
        }else{
            res.status(200).send({"msg":"Please Login!!"})
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
}else{
    res.status(400).send({"msg":"Please Login First!!"})
}

}

module.exports={
    auth
}