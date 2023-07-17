const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require("dotenv").config();
const cors=require("cors")

const app=express();
app.use(cors())
app.use(express.json())

app.use("/users",userRouter);
app.use("/posts",postRouter);

app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log(`server port ${process.env.PORT} running`);
        console.log("connected to mongoDB");
    }catch(err){
        console.log(err);
    }
})