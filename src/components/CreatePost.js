import axios from "axios";
import {react, useState} from 'react';
import { useSelector } from "react-redux";

function CreatePost(){
    const [postText,setPostText]=useState("");
    const {currentUser}=useSelector((state)=>state.user)

    const handlePost=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/api/posts",{
                Description:postText,
                UserId:currentUser._id
            })
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
        <div className="border-b-2 w-full">
            <p className="font-bold pl-2 my-2">{currentUser.Username}</p>
            <form className=" pb-6">
                <textarea type="text" onChange={(e)=>setPostText(e.target.value)}  placeholder="What's up..."
                className="bg-slate-200 rounded-lg w-full md:w-3/4 p-2">
                </textarea>
            </form>
            <button onClick={handlePost} className="bg-green-500 py-2 px-4 rounded-full">Post</button>
        </div>
        </>
    );
}

export default CreatePost;