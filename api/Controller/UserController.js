import User from "../Models/User.js";
import Post from "../Models/Post.js";

export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const update=async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
            const updatedUser=await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {
                    new:true,
                }
            );
            res.status(200).json(updatedUser);
        }
        catch(error){
            next(error);
        }
    }
    else{
        res.status(403).json("Not Allowed");
    }
}

export const deleteUser=async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
            const user=await User.findByIdAndDelete(req.params.id);
            await Post.remove({UserId:req.params.id});
            res.status(200).json("User Deleted");
        
        }
        catch(err){
            next(err);
        }
    }
    else{
        res.status(403).json("Not Allowed");
    }
}

export const followUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const ourUser=await User.findById(req.body.id);
        if(!user.Followers.includes(req.body.id)){
            await user.updateOne(
              {  
                $push:{Followers:req.body.id},
            });
            await ourUser.updateOne(
                {
                    $push:{Following:req.params.id},
                }
            );
            res.status(200).json("Followed");
        }else{
            res.status(403).json("already following");
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
}

export const unfollowUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const ourUser=await User.findById(req.body.id);
        if(user.Followers.includes(req.body.id)){
            await user.updateOne(
              {  
                $pull:{Followers:req.body.id},
            });
            await ourUser.updateOne(
                {
                    $pull:{Following:req.params.id},
                }
            );
            res.status(200).json("Un-Followed");
        }else{
            res.status(403).json("You never followed them");
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
};

export const getByUsername=async(req,res,next)=>{
    try{
        const user=await User.find({Username:req.params.username});
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json("User not found");
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
}

export const fuzzySearch=async(req,res,next)=>{
    try{
        const user= await User.find({Username:{$regex:req.params.str}});
        if(user){
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
}