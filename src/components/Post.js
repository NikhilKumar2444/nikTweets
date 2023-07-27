import {react, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {AiFillLike,AiOutlineLike} from "react-icons/ai";
import formatDistance from "date-fns/formatDistance";
import DummyImages from "../assetts/img/DummyImages.jfif";

function Post({post,setData}){
    const {currentUser}=useSelector((state)=>state.user);
    const [userData,setUserData]=useState();
    const dateStr=formatDistance(new Date(post.createdAt),new Date());
    

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const findUser=await axios.get(`http://localhost:8000/api/users/find/${post.UserId}`);
                setUserData(findUser.data);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[post.UserId,post.Likes]);

    const handleOnClick = async(e)=>{
        e.preventDefault();
        try{
            const like=await axios.put(`http://localhost:8000/api/posts/LD/${post._id}`,{
                id:currentUser._id
            })
        }catch(err){
            console.log(err);
        }
    };
    
    return(
        <>
        {userData&&(
            <>
        <div className="flex">
         <img className="mx-1" style={{width:"40px",height:"40px",borderRadius:"50%"}} src={DummyImages} alt="NA"/>
         <Link to={`/profile/${userData._id}`}>
            <h3 className="font-bold">{userData.Username}</h3>
         </Link>
         <p>{"-->"}{dateStr}</p>
         </div>
         <p>{post.Description}</p>
         <button onClick={handleOnClick}>{post.Likes.includes(currentUser._id)?( <AiFillLike className="text-xl cursor-pointer"/>):(<AiOutlineLike className="text-xl cursor-pointer"/>)}
         {post.Likes.length}
         </button>
         </>
    )}
        </>
    );
}

export default Post;