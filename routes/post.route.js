const express=require("express");
const { auth } = require("../middleware/auth.middle");
const { PostModel } = require("../model/post.model");

const postRouter=express.Router();

postRouter.use(auth)

postRouter.post("/create", async(req,res)=>{
    try{
        const newData={
            ...req.body
        }
        const post=new PostModel(newData)
        await post.save()
        res.status(200).json({msg:"New Post has been Added", post:req.body})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

postRouter.get("/", async(req,res)=>{
    try{
        const post=await PostModel.find();
        res.status(200).json({msg:"All Posts", post})

    }catch(err){
        res.status(400).json({error:err.message})
    }
})

postRouter.get("/filter", async(req,res)=>{
    const {device}=req.query;

    const query={}

    if(device){
        query.device=device
    }
    
    try{
        const post=await PostModel.find(query);
        res.status(200).json({msg:"All Filter Posts", post})

    }catch(err){
        res.status(400).json({error:err.message})
    }
})

postRouter.patch("/update/:postID", async(req,res)=>{
    const {userID}=req.body;
    const {postID}=req.params;
    try{
        const post=await PostModel.findByIdAndUpdate({userID,_id:postID},req.body);
        if(!post){
            res.status(400).json({msg:"Post Not Found"})
        }else{
            res.status(200).json({msg:"Post has been Updated"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

postRouter.delete("/delete/:postID", async(req,res)=>{
    const {userID}=req.body;
    const {postID}=req.params;
    try{
        const post=await PostModel.findByIdAndDelete({userID,_id:postID});
        if(!post){
            res.status(400).json({msg:"Post Not Found"})
        }else{
            res.status(200).json({msg:"Post has been Deleted"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})



module.exports={postRouter}
