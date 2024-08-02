import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import UserItem from "../Others/UserItem";
import { HiXMark } from "react-icons/hi2";
import BlankProfile from "../../assets/blankProfile.png";

function ViewFollowersModal({ isOpen, onClose, data }) {
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const results = useMemo(
    () =>
      users?.filter((item) => {
        return data?.includes(item._id);
      }),
    [data, users]
  );

  if (!isOpen) return null;
  return (
    <div className="  fixed top-0 left-0 backdrop-blur-sm bg-black/40 right-0 bottom-0 flex items-center justify-center z-[9999]">
      <div className=" md:h-3/4 h-full w-full md:pt-4 pt-16 flex flex-col gap-2 bg-black/20 dark:bg-white/10 backdrop-blur-sm md:w-1/3 p-2 md:rounded-lg overflow-y-auto ">
        {results.length > 0 ? (
          results.map((user, index) => (
            <UserItem
              key={index}
              profilePicture={user.profilePicture || BlankProfile}
              name={user.name}
              username={user.username}
              userId={user._id}
              type={"profile"}
            />
          ))
        ) : (
          <p className=" text-center mt-20 dark:text-gray-500">
            No results found
          </p>
        )}
      </div>
      <div
        onClick={onClose}
        className=" absolute  cursor-pointer top-4 text-4xl right-4 text-white"
      >
        <HiXMark />
      </div>
    </div>
  );
}

export default ViewFollowersModal;
