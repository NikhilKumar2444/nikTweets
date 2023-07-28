import {BiSearchAlt} from 'react-icons/bi';
import {FaHashtag} from 'react-icons/fa';
import {AiOutlineHome} from 'react-icons/ai';
import {AiOutlineLogout} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import {logout} from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiExitDoor } from 'react-icons/gi';
import {react,useState,useEffect} from 'react';
import axios from 'axios';
import SearchbarComponent from './SearchbarComponent';
import DummyImages from "../assetts/img/DummyImages.jfif";

function Navbar(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {currentUser}=useSelector((state)=>state.user);

    const [allProfiles,setAllProfiles]=useState(null);
    const [searchTxt,setSearxhTxt]=useState();
    const handleLogOut=(e)=>{
        dispatch(logout());
        navigate("/");
    }

    const searchAll=async(e)=>{
        e.preventDefault();
        setSearxhTxt(e.target.value);
        if(searchTxt!=null){
            console.log(searchTxt);
            try{
                const searchRes=await axios.get(`http://localhost:8000/api/users/fuzzy/${searchTxt}`);
                setAllProfiles(searchRes.data);
            }catch(err){
                console.log(err);
            }
        }
    }

    return(
        <>
        <div style={{position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        zIndex: 1000}} >
            <div className=" justify-between items-center md:flex">
                <h1 className="text-4xl">nikTweets</h1>
                <div className="m-4 flex justify-between items-center">
                    <Link to="/home"><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><AiOutlineHome style={{color:"limegreen"}}/></h1></button></Link>
                    <Link to="/explore"><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><FaHashtag/></h1></button></Link>
                    <Link to={`/profile/${currentUser._id}`}><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><CgProfile style={{color:"yellow"}}/></h1></button></Link>
                    <button onClick={handleLogOut}><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><GiExitDoor style={{color:"red"}}/></h1></button>
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder='Search...'  onChange={searchAll} style={{color:"black",outline:"none"}} className="rounded-full p-2"></input>
                        <BiSearchAlt className='text-2xl m-1'/>
                    </div>
                    <div className={searchTxt?'absolute p-2 m-2':'block'} style={{backgroundColor:"gray",color:"white",borderRadius:"5px"}}>
                        <div style={{maxHeight:"100px",overflowY:"auto"}}>
                        {searchTxt&&allProfiles&&allProfiles.map((user)=>{
                            return(
                                <div key={user._id}>
                                    <Link to={`/profile/${user._id}`}>
                                        <div className='flex m-1'>
                                        <img src={DummyImages} className='m-1' style={{width:"30px",height:"30px",borderRadius:"50%"}}/>
                                        <p className='m-1'>{user.Username}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Navbar;