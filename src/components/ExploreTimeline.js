import {react, useEffect, useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Post from "./Post";
import Login from "./Login";

//everyone

function ExploreTimeline(){
    const [homeTimeline,setHomeTimeline]=useState(null);
    const {currentUser}=useSelector((state)=>state.user);

    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                const timeLinePosts=await axios.get("http://localhost:8000/api/posts/explore");
                setHomeTimeline(timeLinePosts.data);
                console.log(currentUser._id);
                console.log(homeTimeline);

            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[currentUser._id]);
    return(
        
        <div className="mt-2">
        {homeTimeline && homeTimeline.map((post)=>{
            return(
                <div key={post._id} className="p-2">
                    
                    <Post post={post} setData={setHomeTimeline}/>
                </div>
            );
        })}
    </div>
    );
}

export default ExploreTimeline;