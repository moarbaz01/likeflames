import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WriteCommentAndIconsLabels = ({
  comments,
  _id,
  handleOpenCommentModal,
  postType,
}) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className=" py-2 flex flex-col">
      <p
        onClick={() => navigate(`/comments?id=${_id}&post=${postType}`)}
        className="text-gray-500 cursor-pointer hover:text-gray-600 dark:text-gray-400 transition text-sm"
      >
        View all {comments?.length} comments
      </p>
      {user && (
        <p
          onClick={handleOpenCommentModal}
          className="text-main_dark_violet_color dark:text-main_light_purple mt-2 cursor-pointer font-[500] text-sm"
        >
          Write comment
        </p>
      )}
    </div>
  );
};

export default WriteCommentAndIconsLabels;
