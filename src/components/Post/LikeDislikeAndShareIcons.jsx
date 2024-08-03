import { CiChat2, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const LikeDislikeAndShareIcons = ({
  heart,
  handleLikeAndDislike,
  likes,
  comments,
}) => {
  return (
    <div className="flex mt-4 items-center justify-between">
      {/* Caption */}
      <div className="flex items-center dark:text-white text-4xl gap-4">
        <div className="flex items-center gap-2 flex-col">
          <motion.div whileTap={{ scale: 0.5 }}>
            {!heart ? (
              <CiHeart
                onClick={handleLikeAndDislike}
                className="cursor-pointer"
              />
            ) : (
              <FaHeart
                fill="red"
                onClick={handleLikeAndDislike}
                className="cursor-pointer text-4xl"
              />
            )}
          </motion.div>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {likes?.length}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-col">
          <CiChat2 className="cursor-pointer" />
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {comments?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikeDislikeAndShareIcons;
