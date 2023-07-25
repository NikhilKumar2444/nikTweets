import CreatePost from "./CreatePost";
import HomeTimeline from "./HomeTimeline";

function MainFeed(){
    return (
        <>
        <div className="w-full">
        <CreatePost/>
        <HomeTimeline/>
        </div>
        </>
    );
}

export default MainFeed;