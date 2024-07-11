import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import FeedItem from "./FeedItem";

function Feeds({ feedItems }) {
  const navigate = useNavigate();
  const location = useLocation();

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
      } snap-y overflow-y-scroll snap-mandatory`}
    >
      {location.pathname === "/feed" && (
        <div className="fixed md:hidden z-50 top-4 left-4">
          <BiLeftArrowAlt
            className=" text-main_dark_violet_color text-5xl cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      )}
      {filteredFeeds?.map(
        (item, index) =>
          item.postType === "reel" && <FeedItem key={index} {...item} />
      )}
    </div>
  );
}

export default Feeds;
