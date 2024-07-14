import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Feeds from "../components/Feeds/Feeds";
import { useSelector } from "react-redux";
import RequestItems from "../components/Others/RequestItems";

function Feed() {
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  const currentFeeds = useMemo(() => {
    return posts.filter((feed) => feed.postType === "reel");
  }, [posts]);

  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:w-[50vw] w-full">
          <div className="w-fit mx-auto rounded-xl">
            {/* Feed */}
            <Feeds navigate={navigate} feedItems={currentFeeds} />
          </div>
        </div>
        <div className="sticky z-0 top-0 h-full md:block  ">
          <RequestItems />
        </div>
      </div>
    </div>
  );
}

export default Feed;
