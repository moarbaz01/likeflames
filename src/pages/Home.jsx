import React, { useMemo } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Posts from "../components/Post/Posts";
import { useSelector } from "react-redux";
import RequestItems from "../components/Others/RequestItems";
import Navbar from "../components/Layout/Navbar";

function Home() {
  const { posts, isLoading } = useSelector((state) => state.post);
  const sortedPosts = useMemo(
    () =>
      [...posts]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );

  return (
    <div className="">
      <Navbar />
      <div className="flex w-full justify-center relative px-2 md:gap-4 md:pt-24 pt-20  md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto lg:w-[50vw] md:h-full md:[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">
            {<Posts posts={sortedPosts} />}
          </div>
        </div>
        <div className="sticky z-0 top-0 h-full md:block  ">
          <RequestItems />
        </div>
      </div>
    </div>
  );
}

export default Home;
