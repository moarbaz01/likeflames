import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useRelativeTime from "../../hooks/useRelativeTime";

const PostTopSection = ({
  user,
  setShowPostOptionModal,
  date,
  navigateToPostPage,
}) => {
  const relativeTime = useRelativeTime(new Date(date));
  const handleOptionModal = (e) => {
    e.stopPropagation();
    setShowPostOptionModal((prev) => !prev);
  };
  return (
    <div className="flex w-full items-center justify-between px-4 py-2">
      <div
        onClick={navigateToPostPage}
        className="flex cursor-pointer items-center gap-4"
      >
        <img
          className="w-12 h-12 aspect-square object-cover rounded-full"
          src={user?.profilePicture}
          alt=""
        />
        <div>
          <h1 className="text-lg font-[400] dark:text-white text-main_text_black">
            {user?.name}
          </h1>
          <p className="text-gray-500 text-xs dark:text-gray-400">
            {relativeTime}
          </p>
        </div>
      </div>
      <HiOutlineDotsHorizontal
        onClick={handleOptionModal}
        className="cursor-pointer dark:text-white"
      />
    </div>
  );
};

export default PostTopSection;
