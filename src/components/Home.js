import LeftPart from "./LeftPart";
import MainFeed from "./MainFeed";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Login from "./Login";

function Home(){
    const {currentUser}=useSelector((state)=>state.user); 
    return(
        <>{
            !currentUser ? (<Login/>):(<div>
                <Navbar/>
        <div className="mt-40 md:mt-20 md:flex">
            <LeftPart/>
            <MainFeed/>
        </div>
                </div>)
        }
        </>
    );
}

export default Home;