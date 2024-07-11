import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import ImageGrid from "../components/ImageGrid";
import SearchResults from "../components/SearchResults";
import { BiLeftArrowAlt } from "react-icons/bi";

function Explore() {
  const [query, setQuery] = useState("");
  const [resultsModal, setResultsModal] = useState(false);

  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">

        <Sidebar />
        <div className="md:overflow-y-auto md:h-full h-auto md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">

            {/* Search Bar */}
            <div className=" flex items-center relative z-50 gap-2">
              {resultsModal && <div className=" bg-main_dark_violet_color p-2 text-white rounded-full">
                <BiLeftArrowAlt onClick={() => setResultsModal(false)} className="dark:text-white cursor-pointer md:hidden text-3xl" />
              </div>}
              <input
                type="text"
                name="search"
                className=" w-full md:hidden dark:text-white text-text_black dark:bg-dark_secondary_bg border-2 border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
                placeholder="Search"
                onFocus={() => setResultsModal(true)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <input
                type="text"
                name="search"
                className=" w-full hidden md:block dark:text-white text-text_black dark:bg-dark_secondary_bg border-2 border-main_light_purple rounded-md focus:outline-main_dark_violet_color p-2"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
            {/*  */}
            <ImageGrid />
          </div>
        </div>
      </div>

      <SearchResults isOpen={resultsModal} query={query} />
    </div>
  );
}

export default Explore;
