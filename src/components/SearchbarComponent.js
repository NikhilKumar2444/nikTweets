import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function SearchbarComponent(user){
    return(
        <>
        <div className="flex m-1">
            <Link to={`/profile/${user._id}`}>
                <div className="flex">
                <img src={require("../assetts/img/DummyImages.jfif")} style={{width:"30px",height:"30px"}} alt="NA"/>
                <p>{user.Username}</p>
                </div>
            </Link>
        </div>
        </>
    )
}

export default SearchbarComponent;