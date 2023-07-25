import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const createPost=async(req,res,next)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(newPost);
    }
    catch(err){
        res.status(500);
        next(err);
    }
}

export const deletePost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.UserId===req.body.id){
            await post.deleteOne();
            res.status(200).json("Deleted");
        }
        else{
            res.send(500).json(err);
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
}

export const likeDislike=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.Likes.includes(req.body.id)){
            await post.updateOne({$pull:{Likes:req.body.id}});
            res.status(200).json("Un-liked");
        }
        else{
            await post.updateOne({$push:{Likes:req.body.id}});
            res.status(200).json("Liked");
        }
    }
    catch(err){
        res.status(500);
        next(err);
    }
}

export const timeline=async(req,res,next)=>{
    try{
        const user= await User.findById(req.params.id);
        const userPosts= await Post.find({UserId:user._id});
        const followingPosts=await Promise.all(
            user.Following.map((followingId)=>{
                return Post.find({UserId:followingId})
            })
        );
        res.status(200).json(userPosts.concat(...followingPosts))
    }catch(err){
        res.send(500);
        next(err);
    }
}

export const getHomeTimeline=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        const userPosts=await Post.find({UserId:req.params.id}).sort({
            createAt:-1,}
        );
        res.status(200).json(userPosts);
    }catch(err){
        res.status(500);
        next(err);
    }
}

export const exploreTimeline=async(req,res,next)=>{
    try{
        const explorePosts= await Post.find().sort({createdAt:-1});
        res.status(200).json(explorePosts);
    }
    catch(err){
        res.status(500);
        next(err);
    }
}