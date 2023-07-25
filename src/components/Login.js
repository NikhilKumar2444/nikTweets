import { Link } from "react-router-dom";
import {react,useState} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";



function Login(){
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSignIn=async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post("http://localhost:8000/api/auth/signin",{
                Email,
                Password
            })
            dispatch(loginSuccess(res.data));
            navigate("/home");
            console.log(res.data);
        }
        catch(err){
            dispatch(loginFailed());
            alert("Invalid Details");
            console.log(err);
        }
    }
    return (
        <>
        <div className="md:mt-40 md:flex">
            <div className="md:w-1/2 md:ml-40">
                <div className="text-5xl md:text-10xl mb-5 md:w-1/2">
                Welcome to NikTweets
                </div>
                <div className="text-xl md:text-4xl md:w-1/2" style={{color:"lime"}}>
                    Step into the largest social playground in the worl... **scoffs** oh! boy **desperate attempt to control laughter**
                    Ahem!, in the world.
                </div>
            </div>
            <div className="p-2" style={{borderRadius:"10px",backgroundColor:"#edfff1"}}>
                <div className="md:flex items-between justify-center">
                    <div>
                        <p className="ml-2">Email</p>
                        <input type="text" className="m-2" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                    </div>
                    <div>
                        <p className="ml-2">Password</p>
                        <input type="password" className="m-2" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
                    </div>
                </div>
                <div className="w-full mt-5 md:mt-10">
                    <button className="w-full" onClick={handleSignIn} style={{borderRadius:"5px",backgroundColor:"darkgreen",color:"white"}}>Login</button>
                </div>
                <div className="w-full mt-5 md:mt-10">
                    <button className="w-full" style={{borderRadius:"5px",backgroundColor:"white",color:"gray"}}><Link to="/register">Create new Account</Link></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;