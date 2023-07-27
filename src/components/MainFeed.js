import CreatePost from "./CreatePost";
import HomeTimeline from "./HomeTimeline";

function MainFeed(){
    return (
        <>
        <div className="w-full md:ml-80">
        <CreatePost/>
        <HomeTimeline/>
        </div>
        </>
    );
}

export default MainFeed;