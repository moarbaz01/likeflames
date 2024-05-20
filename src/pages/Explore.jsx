import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import ImageGrid from "../components/ImageGrid";

function Explore() {
  const [search, setSearch] = React.useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className=" md:pb-0 pb-24 ">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="relative mx-auto max-w-[1400px] mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mr-6  flex justify-between gap-4 ">
          <div className=" md:h-[90vh]  md:overflow-y-scroll ">
            {/* Search bar */}
            <div className=" flex items-center gap-2">
              <input
                type="text"
                name="search"
                className=" w-full text-text_black dark:bg-dark_secondary_bg border-2 border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
                placeholder="Search"
                onChange={handleChange}
                value={search}
              />
              <div className=" bg-main_dark_violet_color p-2 text-white rounded-full">
                <CiSearch className=" text-2xl" />
              </div>
            </div>
            {/* Image grid */}
            <ImageGrid />
          </div>
          {/* <div className=" md:flex hidden flex-col gap-4">
            <h1 className=" text-gray-500">Requests</h1>
            {requests.map((request, index) => {
              return (
                <div
                  key={index}
                  className=" bg-main_bg_white w-full rounded-xl px-4 py-2"
                >
                  <div className="flex items-start">
                    <img className="h-8 w-8" src={request.profile} alt="" />
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Explore;
