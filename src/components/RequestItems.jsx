import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import { useMemo } from "react";
import BlankProfile from "../assets/blankProfile.png";

function RequestItems() {
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.user);

  // Most Followed Users
  const mostFollowedUsers = useMemo(
    () => [...users]?.sort((a, b) => b.followers?.length - a.followers?.length),
    [users]
  );

  return (
    <div className=" lg:flex hidden lg:w-[20vw] flex-col gap-4">
      <h1 className="  text-main_light_purple text-sm font-[500]">New Users</h1>
      {mostFollowedUsers?.map((u, index) => {
        return (
          user?._id !== u._id && (
            <UserItem
              key={index}
              profilePicture={u.profilePicture || BlankProfile}
              name={u.name}
              username={u.username}
              userId={u._id}
              type={"profile"}
            />
          )
        );
      })}
    </div>
  );
}

export default RequestItems;
