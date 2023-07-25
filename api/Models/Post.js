import mongoose from "mongoose";

const PostSchema=new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required:true
    },
    Likes:{
        type:Array,
        default:[]
    }
},   
    {timestamps:true}
);

export default mongoose.model("Post",PostSchema);