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

function Navbar(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {currentUser}=useSelector((state)=>state.user);

    const handleLogOut=(e)=>{
        dispatch(logout());
        navigate("/");
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
            <div className="m-2 justify-between items-center md:flex">
                <h1 className="text-4xl">nikTweets</h1>
                <div className="m-5 flex justify-between items-center">
                    <Link to="/home"><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><AiOutlineHome style={{color:"limegreen"}}/></h1></button></Link>
                    <Link to="/explore"><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><FaHashtag/></h1></button></Link>
                    <Link to={`/profile/${currentUser._id}`}><button><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><CgProfile style={{color:"yellow"}}/></h1></button></Link>
                    <button onClick={handleLogOut}><h1 className="font-bold md:m-1 md:ml-5 md:text-2xl"><GiExitDoor style={{color:"red"}}/></h1></button>
                </div>
                <div className="flex justify-between items-center">
                    <input type="text" placeholder='Search...' style={{color:"black",outline:"none"}} className="rounded-full p-2"></input>
                    <BiSearchAlt className='text-2xl m-1'/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Navbar;