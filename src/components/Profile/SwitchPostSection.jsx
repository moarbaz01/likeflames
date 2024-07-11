import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SwitchPostSection = ({
  setShowPost,
  setShowReplies,
  setShowLiked,
  showPost,
  showReplies,
  showLiked,
}) => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  return (
    <div className="flex bg-white dark:bg-dark_secondary_bg px-4 py-2 mt-4 justify-between rounded-xl w-full">
      <div
        onClick={() => {
          setShowPost(true);
          setShowReplies(false);
          setShowLiked(false);
        }}
        className="cursor-pointer"
      >
        <h1
          className={`text-sm ${
            !showPost
              ? "text-gray-500"
              : "text-main_dark_violet_color dark:text-main_light_purple"
          }`}
        >
          POST
        </h1>
        {showPost && (
          <div className="bg-main_dark_violet_color dark:bg-main_light_purple h-1"></div>
        )}
      </div>

      {/* Reels */}
      {user?._id === id && (
        <div
          onClick={() => {
            setShowPost(false);
            setShowReplies(false);
            setShowLiked(true);
          }}
          className="cursor-pointer"
        >
          <h1
            className={`text-sm ${
              !showLiked
                ? "text-gray-500"
                : "text-main_dark_violet_color dark:text-main_light_purple"
            }`}
          >
            Liked
          </h1>
          {showLiked && (
            <div className="bg-main_dark_violet_color dark:bg-main_light_purple h-1"></div>
          )}
        </div>
      )}

      {/* Replies */}
      {user?._id === id && (
        <div
          onClick={() => {
            setShowPost(false);
            setShowReplies(true);
            setShowLiked(false);
          }}
          className="cursor-pointer"
        >
          <h1
            className={`text-sm ${
              !showReplies
                ? "text-gray-500"
                : "text-main_dark_violet_color dark:text-main_light_purple"
            }`}
          >
            REPLIES
          </h1>
          {showReplies && (
            <div className="bg-main_dark_violet_color dark:bg-main_light_purple h-1"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SwitchPostSection;
