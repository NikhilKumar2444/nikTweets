import ExploreTimeline from "./ExploreTimeline";
import LeftPart from "./LeftPart";
import Login from "./Login";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function Explore(){
    const {currentUser}=useSelector((state)=>state.user);

    return(
        <>
        {!currentUser?(<Login/>):(
        <div>
            <Navbar/>
            <div className="mt-40 md:mt-20 md:flex">
            <LeftPart/>
            <ExploreTimeline/>
            </div>
         </div>)
        }
        </>
    );
}

export default Explore;