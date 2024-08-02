import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import FeedItem from "../Feeds/FeedItem";
import FeedItemSkeleton from "../Skeleton/FeedItemSkeleton";
import useSkeleton from "../../hooks/useSkeleton";

function Feeds({ feedItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const skeletonLoading = useSkeleton();

  const filteredFeeds = useMemo(() => {
    if (feedItems.length === 0) {
      return [];
    }
    return [...feedItems]?.filter((item) => item.postType === "reel");
  });

  return (
    <div
      className={`fixed md:static top-0 left-0 right-0 bottom-0 ${
        filteredFeeds?.length > 0 ? "md:h-[85vh]" : ""
      } snap-y overflow-y-scroll feeds snap-mandatory`}
    >
      {location.pathname === "/feed" && (
        <div className="fixed md:hidden z-50 top-4 left-4">
          <BiLeftArrowAlt
            className=" text-main_dark_violet_color text-5xl cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      )}
      {skeletonLoading
        ? Array(10)
            .fill()
            .map((_, index) => <FeedItemSkeleton key={index} />)
        : filteredFeeds?.map(
            (item, index) =>
              item.postType === "reel" && <FeedItem key={index} {...item} />
          )}
    </div>
  );
}

export default Feeds;
