import { Link } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Register(){
    const [FirstName,setFirstName]=useState("");
    const [LastName,setLastName]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const [Username,setUsername]=useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSignUp=async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res=await axios.post("http://localhost:8000/api/auth/signup",{
                Email,
                Password,
                FirstName,
                LastName,
                Username
            })
            dispatch(loginSuccess(res.data));
            navigate("/home");
            console.log(res.data);
        }
        catch(err){
            dispatch(loginFailed());
            alert("Unsuccessfull");
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
                    Let's get you going!
                </div>
            </div>
            <div className="p-2 md:mr-20" style={{borderRadius:"10px",backgroundColor:"#edfff1"}}>
                <div className="md:flex  items-between justify-center" style={{maxWidth:"650px",flexWrap:"wrap"}}>
                    <div>
                        <p className="ml-2">Email</p>
                        <input type="text" className="m-2" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                    </div>
                    <div>
                        <p className="ml-2">Username</p>
                        <input type="text" className="m-2" onChange={(e)=>setUsername(e.target.value)} placeholder="Username"></input>
                    </div>
                    <div>
                        <p className="ml-2">FirstName*</p>
                        <input type="text" className="m-2" onChange={(e)=>setFirstName(e.target.value)} placeholder="FirstName"></input>
                    </div>
                    <div>
                        <p className="ml-2">LastName</p>
                        <input type="text" className="m-2" onChange={(e)=>setLastName(e.target.value)} placeholder="LastName"></input>
                    </div>
                    <div>
                        <p className="ml-2">Password</p>
                        <input type="password" className="m-2" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
                    </div>
                </div>
                <div className="w-full mt-5 md:mt-10">
                    <button className="w-full" onClick={handleSignUp}  style={{borderRadius:"5px",backgroundColor:"darkgreen",color:"white"}}>Create Account</button>
                </div>
                <div className="w-full mt-5 md:mt-10">
                    <button className="w-full" style={{borderRadius:"5px",backgroundColor:"white",color:"gray"}}><Link to="/login">Back to Login</Link></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;