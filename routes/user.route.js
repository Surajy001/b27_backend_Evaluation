const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");


const userRouter=express.Router();

userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
      bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.status(400).json({error:err.message})
        }else{
            const user=new UserModel({name,email,gender,password:hash})
            await user.save()
            res.status(200).json({msg:"user has been Registed", user:req.body})
        }
      })  


    }catch(err){
        res.status(400).json({error:err.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id},process.env.SECRET)
                    res.status(200).json({msg:"Login Successfull",token})
                }else{
                    res.status(400).json({msg:"Wrong Credential"})
                }
            })
        }else{
            res.status(400).json({msg:"User not exist"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


module.exports={userRouter}