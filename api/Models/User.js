import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
        Username:{
            type:String,
            required:true,
            unique:true
        },
        Email:{
            type:String,
            required:true,
            unique:true
        },
        FirstName:{
            type:String,
            required:true,
        },
        LastName:{
            type:String,
            required:false,
        },
        Password:{
            type:String,
            required:true
        },
        ProfilePic:{
            type:String,
        },
        Followers:{
            type:Array,
            default:[]
        },
        Following:{
            type:Array,
            default:[]
        },
        Description:{
            type:String,
            default:""
        }
},
 {timestamps:true}   
);

export default mongoose.model("User",UserSchema);