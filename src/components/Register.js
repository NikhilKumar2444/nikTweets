import { Link } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./LoginReg.css";

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
        <div className="Holder">
            <div className="md:flex">
                <div className="md:w-1/2 p-2 md:ml-40">
                    <div className="text-2xl md:text-5xl md:text-10xl mb-5 md:w-1/2" style={{color:"white"}}>
                    Welcome to NikTweets
                    </div>
                    <div className="text-xl md:text-4xl md:w-1/2" style={{color:"lime"}}>
                    Let's get you going!
                    </div>
                </div>
                <div className="m-5" style={{borderRadius:"10px"}}>
                        <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
                            <form>
                                <div className="mx-2 md:items-center" >
                                    <div className="md:flex">
                                        <div className="flex-1">
                                            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}
                                                className="block w-full md:px-5 md:py-2.5 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                        
                                        <div className="flex-1 px-2">
                                            <input type="text" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}
                                                className="block w-full md:px-5 md:py-2.5 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                    </div>
                                    <div className="md:flex">
                                        <div className="flex-1 px-2">
                                            <input type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}
                                                className="block w-full md:px-5 md:py-2.5 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>

                                        <div className="flex-1 px-2">
                                            <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}
                                                className="block w-full md:px-5 md:py-2.5 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                        </div>
                                    </div>
                                    <div className="flex-1 px-2">
                                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
                                            className="block w-full md:px-5 md:py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>


                                </div>
                                <button onClick={handleSignUp}
                                    className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">
                                    Sign Up
                                </button>
                                <Link to="/login">
                                <button
                                    className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Back to Login
                                </button></Link>
                            </form>
                        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;