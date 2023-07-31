import { Link } from "react-router-dom";
import {react,useState} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./LoginReg.css";


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
        <div className="Holder">.
            <div className="md:flex">
                <div className="md:w-1/2 md:ml-40">
                    <div className=" md:text-5xl md:text-10xl mb-5 md:w-1/2" style={{color:"white"}}>
                    Welcome to NikTweets
                    </div>
                    <div className="text-xl md:text-4xl md:w-1/2" style={{color:"lime"}}>
                        Step into the largest social playground in the worl... **scoffs** oh! boy **desperate attempt to control laughter**
                        Ahem!, in the world.
                    </div>
                </div>
                <div className="m-5" style={{borderRadius:"10px"}}>
                        <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
                            <form>
                                <div className="-mx-2 md:items-center md:flex" >
                                    <div className="flex-1 px-2">
                                        <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}
                                            className="block w-full px-5 py-2.5 mt-2 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div className="flex-1 px-2">
                                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
                                            className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>
                                <button onClick={handleSignIn}
                                    className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50">
                                    Login
                                </button>
                                <Link to="/register">
                                <button
                                    className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Create new Account
                                </button></Link>
                            </form>
                        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;