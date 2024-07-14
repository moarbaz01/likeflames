import React, { useCallback} from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserItem({ profilePicture, userId, name, username, type }) {
  const { connectedUsers } = useSelector((state) => state.connectedUsers);
  const { user } = useSelector((state) => state.user);
  const { users, isLoading } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (user) {
      if (type === "chat") {
        navigate(`/chat/${userId}`);
      }
      if (type === "profile") {
        navigate(`/profile/${userId}`);
      }
    } else {
      navigate("/login");
      toast.error("Login your account");
    }
  }, [userId, navigate, type, user]);

  return (
    <div
      onClick={handleClick}
      className={`flex w-full items-end cursor-pointer 
bg-white dark:bg-dark_secondary_bg transition rounded-xl py-4 px-2 justify-between`}
    >
      <div className=" flex items-center gap-4">
        <div className="relative h-10 w-10 ">
          <img
            className=" w-full h-full rounded-full"
            src={profilePicture}
            alt=""
          />
          {connectedUsers[userId] && (
            <div className="h-4 w-4 bg-green-500 rounded-full absolute bottom-0 -right-1 border-2 border-main_dark_violet_color"></div>
          )}
        </div>
        <div className=" flex flex-col text-black">
          <p className="font-[500] text-sm text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
            {name}
            {""}
          </p>
          <p className="font-[400] text-sm text-ellipsis dark:text-white overflow-x-hidden text-nowrap">
            @{username}
            {""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
