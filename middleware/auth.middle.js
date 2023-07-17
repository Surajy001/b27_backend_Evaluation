const jwt=require("jsonwebtoken");
require("dotenv").config();

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try{
           const decoded=jwt.verify(token,process.env.SECRET)
           if(decoded){
            req.body.userID=decoded.userID
            next()
           }else{
            res.status(400).json({msg:"Not Authorized"})
           }

        }catch(err){
            res.json({error:err.message})
        }
    }else{
        res.json({msg:"Please Login"}) 
    }
    
}

module.exports={auth}