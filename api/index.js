import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoutes from './Route/Users.js';
import authRoutes from "./Route/Auth.js";
import postRoutes from "./Route/Posts.js";

const app=express();
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.MONGO,{useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>app.listen(process.env.PORT,()=>{
        console.log("Running");
    })).catch((error)=>{console.log(error)});

app.get('/',(req,res)=>{
    res.send("hello");
})

app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
