import toast from "react-hot-toast";
import { BiPencil, BiShare } from "react-icons/bi";
import { PiTrash } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PostOptionModal = ({
  handleDeletePost,
  currentUser,
  postId,
  postType,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  //   Handle Share Link
  const handleShareLink = () => {
    navigator.clipboard.writeText(
      `${window.location.href}${postType}/${postId}`
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col backdrop-blur-sm gap-4 absolute right-4 top-16 bg-white shadow-xl rounded-xl p-2"
    >
      {currentUser?._id === user?._id && (
        <div
          onClick={() =>
            navigate(
              `/createPost?postType=${postType}&post=${postId}&edit=${true}`
            )
          }
          className="flex items-center gap-2 cursor-pointer"
        >
          <BiPencil />
          <p>Edit</p>
        </div>
      )}
      <div
        onClick={handleShareLink}
        className="flex items-center gap-2 cursor-pointer"
      >
        <BiShare />
        <p>Copy Link</p>
      </div>
      {currentUser?._id === user?._id && (
        <div
          onClick={handleDeletePost}
          className="flex text-red-500 items-center gap-2 cursor-pointer"
        >
          <PiTrash />
          <p>Delete</p>
        </div>
      )}
    </motion.div>
  );
};

export default PostOptionModal;
