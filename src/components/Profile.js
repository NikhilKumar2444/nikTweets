import LeftPart from './LeftPart';
import Navbar from './Navbar';
import MainFeed from './MainFeed';
import CreatePost from './CreatePost';
import ProfileTimeline from './ProfileTimeline';
function Profile(){
    return(
        <>
        <Navbar/>
        <div className="mt-40 md:mt-20 md:flex">
          <LeftPart/>
          <div className='w-full md:ml-80'>
            <CreatePost/>
            <ProfileTimeline/>
          </div>
        </div>
        </>
    );
}

export default Profile;