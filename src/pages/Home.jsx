import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Stories from "../components/Stories";
import { requests } from "../data";
import avatar2 from "../assets/avatars/avatar2.png";
// import Reels from "../components/Reels";
import Posts from "../components/Posts";
import CallModal from "../components/CallModal";
import Breadcrumbs from "../components/Breadcrumbs";
function Home() {
  return (
    <div className=" md:pb-0 pb-24 ">
      <div className="md:static md:border-b-0 fixed dark:border-main_dark_violet_color border-b-2 top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
      <div className="relative mx-auto max-w-[1400px] mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mr-6  flex justify-between gap-4 ">
          <div className=" md:h-[90vh] md:min-w-[40%] rounded-xl md:mt-0 mt-16  md:overflow-y-scroll ">
            <Posts />
          </div>
          <div className=" lg:flex hidden flex-col gap-4">
            <h1 className=" text-gray-500">Requests</h1>
            {requests.map((request, index) => {
              return (
                <div
                  key={index}
                  className=" bg-main_bg_white dark:bg-dark_secondary_bg  rounded-xl px-4 py-2"
                >
                  <div className="flex items-start">  
                    <img
                      className="max-h-8 max-w-8"
                      src={request.profile}
                      alt=""
                    />
                    <div className=" pl-4">
                      <h1 className=" font-[500]">{request.name}</h1>
                      <p className=" opacity-80 text-sm">
                        {request.mutuals} Mutual
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <button className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2">
                      Accept
                    </button>
                    <button className=" bg-main_bg_white border-[1px] border-black rounded-full text-black px-8 py-2">
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
