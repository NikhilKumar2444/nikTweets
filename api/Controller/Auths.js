import { hashSync } from "bcrypt";
import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.Password,salt);
        const newUser=new User({...req.body,Password:hash});
        await newUser.save();

        const token=jwt.sign({id:newUser._id},process.env.JWT);
        res.cookie('access_token',token,{
            httpOnly:true,
            withCredentials: true
        }).status(200).json(newUser);
    }
    catch(err){
        res.status(500);
        next(err);
    }
};

export const signin=async(req,res,next)=>{
    try{
        const user = await User.findOne({
            Email:req.body.Email
        }
        )
        if(!user){
            res.status(404).json("User does not exhist");
        }
        const verify=await bcrypt.compare(req.body.Password,user.Password);
        if(!verify){
            res.status(403).json("wrong password");
        }
        const token=jwt.sign({id:user._id},process.env.JWT);
        res.cookie('access_token',token,{
            httpOnly:true,
            withCredentials: true
        }).status(200).json(user);
    }
    catch(err){
        res.status(500);
        next(err);
    }
}