import {react, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {AiFillLike,AiOutlineLike} from "react-icons/ai";
import formatDistance from "date-fns/formatDistance";
import DummyImages from "../assetts/img/DummyImages.jfif";
import {MdOutlineDeleteForever} from "react-icons/md";

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

    const manageDelete=async(e)=>{
        e.preventDefault();
        try{
            await axios.delete(`http://localhost:8000/api/posts/delete/${post._id}`,{
                data:{id:currentUser._id}
            })
        }catch(err){
            console.log(err);
        }
    }

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
            <div className="card md:w-3/4">
                <div className="card-header">
                    <div className="flex justify-between">
                        <Link to={`/profile/${userData._id}`}>
                                <img className="m-1" style={{width:"40px",height:"40px",borderRadius:"50%"}} src={DummyImages} alt="NA"/>
                                <h3 className="font-bold">{userData.Username}</h3>
                        </Link>
                        <div className="flex">
                        <p style={{color:"gray"}}>{dateStr}</p>
                        <div>
                        {currentUser._id===userData._id?(
                            <button onClick={manageDelete}><MdOutlineDeleteForever className="text-xl m-1" style={{left:"200px"}}/></button>):(<></>)
                        }
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{post.Description}</h5>
                    <button className="flex btn btn-primary" onClick={handleOnClick}>{post.Likes.includes(currentUser._id)?( <AiFillLike className="text-xl m-1 cursor-pointer"/>):(<AiOutlineLike className="text-xl m-1 cursor-pointer"/>)}
                    <div className="text-xl">{post.Likes.length}</div>
                    </button>
                </div>
            </div>
            
         </>
    )}
        </>
    );
}

export default Post;