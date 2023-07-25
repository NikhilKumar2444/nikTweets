import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function LeftPart(){
    const {currentUser}=useSelector((state)=>state.user);
    const {id}=useParams();
    const [leftSideUser,setLeftSideUser]=useState(null);
    const [userName,setUserName]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [id2,setid2]=useState();
    const [followingCount,setFollowingCount]=useState(0);
    const [followersCount,setFollowersCount]=useState(0);
    const [following,setFollwoing]=useState(false);
    const handleFollow=async(e)=>{
        try{
            await axios.put(`http://localhost:8000/api/users/follow/${id2}`,{
                id:currentUser._id
            });
        }catch(err){
            console.log(err);
        }
    };
    const handleUnFollow=async(e)=>{
        try{
            await axios.put(`http://localhost:8000/api/users/unfollow/${id2}`,{
                id:currentUser._id
            });
        }
        catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{
    const addData=async(e)=>{
        if(id){
            console.log("bsdk");
            const userL=await axios.get(`http://localhost:8000/api/users/find/${id}`);
            setLeftSideUser(userL.data);
            setUserName(userL.data.Username);
            setFirstName(userL.data.FirstName);
            setLastName(userL.data.LastName);
            setEmail(userL.data.Email);
            setid2(userL.data._id);
            setFollowersCount(userL.data.Followers.length);
            setFollowingCount(userL.data.Following.length)
            if(userL.data.Followers.includes(currentUser._id)){
                setFollwoing(true);
            }
            else{
                setFollwoing(false);
            }
        }
        else{
            setUserName(currentUser.Username);
            setFirstName(currentUser.FirstName);
            setLastName(currentUser.LastName);
            setEmail(currentUser.Email);
            setFollowersCount(currentUser.Followers.length);
            setFollowingCount(currentUser.Following.length);
        }
    }
    addData();
},[]);
    return(
        <>
        <div className="m-2 md:w-1/4">
            <div className="m-2">
            <h1 className="flex text-2xl font-bold items-between justify-center">{userName}</h1>
            <h1 className="text-xl flex items-between justify-center">{firstName}
            {" "+lastName}</h1>
            <h1 className="flex items-between justify-center">Followers{" | "+followersCount+" "}
            Following{" | "+followingCount}</h1>
            {
                (id&&!(id===currentUser._id))?(following?(<button className="ml-20" style={{backgroundColor:"crimson",color:"white",borderRadius:"5px"}} onClick={handleUnFollow}>unfollow</button>):(<button className="ml-20" style={{backgroundColor:"lightgreen",color:"white",borderRadius:"5px"}} onClick={handleFollow}>follow</button>)):(<div></div>)
            }
            <h1 className="flex items-between justify-center text-slate-500">{email}</h1>
            </div>
        </div>
        </>
    );
}

export default LeftPart;