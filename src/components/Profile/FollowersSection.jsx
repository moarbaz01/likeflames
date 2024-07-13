import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_NOTIFICATION, FOLLOW_AND_UNFOLLOW } from "../../services/api";
import useSocket from "../../hooks/useSocket";
import apiRequest from "../../services/apiRequest";
import toast from "react-hot-toast";
import BlankProfile from "../../assets/blankProfile.png";
import { FaSms } from "react-icons/fa";
import { PiNotePencilThin, PiShareThin } from "react-icons/pi";
import ViewFollowersModal from "../ViewFollowersModal";
import {
  followAndUnfollowUser,
  updateNotification,
} from "../../redux/slicers/profileUser";
import { fetchUser } from "../../redux/slicers/user";

const FollowersSection = () => {
  const { user, token } = useSelector((state) => state.user);
  const { profileUser } = useSelector((state) => state.profileUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editButtonValue, setEditButtonValue] = useState("");
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const [viewFollowersModal, setViewFollowersModal] = useState(false);
  const [selectedFollowersData, setSelectedFollowersData] = useState(null);
  const dispatch = useDispatch();

  // Is Request already sent
  const isRequestAlreadySent = useMemo(() => {
    return profileUser?.notifications?.some((n) => n.from._id === user?._id);
  }, [user?._id, profileUser?.notifications]);

  // Send Real Time Notifications
  const sendRealTimeNotification = useCallback(() => {
    socket.emit("send:notification", { from: user?._id, to: id });
  }, [socket, user?._id, id]);

  // Handle View Followers
  const handleViewFollowers = useCallback(
    (query) => {
      if (query === "followers") {
        setSelectedFollowersData(profileUser.followers);
      } else {
        setSelectedFollowersData(profileUser.following);
      }

      setViewFollowersModal(true);
    },
    [profileUser]
  );

  // Handle Send Request
  const handleSendRequest = useCallback(async () => {
    if (!token && !user) {
      return toast.error("You must be logged in to send a friend request");
    }

    if (isRequestAlreadySent) {
      return toast.error("You have already sent a request to this user");
    }

    try {
      await apiRequest({
        method: "post",
        url: CREATE_NOTIFICATION,
        data: {
          to: id,
          type: "request",
          info: `${user?.name} has sent you a friend request`,
        },
        token,
      });

      toast.success("Request sent successfully");
      sendRealTimeNotification();
      dispatch(updateNotification({ userId: user?._id }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to send friend request");
    }
  }, [
    token,
    id,
    user,
    isRequestAlreadySent,
    sendRealTimeNotification,
    dispatch,
  ]);

  // Handle Follow And Unfollow
  const handleFollowAndUnfollow = useCallback(async () => {
    if (!token && !user) {
      return toast.error("You must be logged in to follow/unfollow a user");
    }
    setLoading(true);
    try {
      const res = await apiRequest({
        method: "put",
        url: FOLLOW_AND_UNFOLLOW,
        data: { to: id },
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchUser());
      dispatch(followAndUnfollowUser({ userId: user?._id, followUserId: id }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to follow/unfollow user");
    } finally {
      setLoading(false);
    }
  }, [token, id, user?._id, dispatch]);

  const handleEditAndFollow = useCallback(() => {
    if (user?._id === id) {
      navigate("/edit-profile");
    } else {
      if (editButtonValue === "Unfollow" || editButtonValue === "Follow") {
        handleFollowAndUnfollow();
      } else if (editButtonValue === "Send Request") {
        handleSendRequest();
      } else if (editButtonValue === "Request Back") {
        toast.error("Request Back functionality is not implemented yet");
      }
    }
  }, [
    editButtonValue,
    handleFollowAndUnfollow,
    handleSendRequest,
    user?._id,
    id,
    navigate,
  ]);

  // Handle Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  useEffect(() => {
    let temp = "";
    if (user?._id === id) {
      temp = "Edit Profile";
    } else if (!profileUser?.followers?.includes(user?._id)) {
      if (profileUser?.privacy === "private") {
        temp = isRequestAlreadySent ? "Request Back" : "Send Request";
      } else {
        temp = "Follow";
      }
    } else {
      temp = "Unfollow";
    }
    setEditButtonValue(temp);
  }, [user?._id, id, profileUser, isRequestAlreadySent]);

  return (
    <>
      <div className="flex justify-evenly bg-white dark:bg-dark_secondary_bg rounded-xl mt-4 py-4 lg:flex-row flex-col items-center w-full">
        <div className="relative text-center mx-2">
          <img
            src={profileUser?.profilePicture || BlankProfile}
            className="md:size-32 size-40 ring-4 ring-main_light_purple hover:opacity-80 transition cursor-pointer shadow-2xl dark:shadow-none shadow-white rounded-full"
            alt="Profile"
          />
          {profileUser?.privacy === "private" && (
            <div className="mt-2 dark:text-white">Private Account</div>
          )}
        </div>

        <div className="flex justify-between mx-2 gap-16 mt-6">
          <div className="flex items-center cursor-pointer gap-1 flex-col">
            <h1 className="text-main_dark_violet_color dark:text-main_light_purple md:text-5xl text-6xl font-[500]">
              {profileUser?.posts?.length}
            </h1>
            <p className="text-text_black dark:text-white text-sm font-[500]">
              Posts
            </p>
          </div>
          <div
            onClick={() => handleViewFollowers("followers")}
            className="flex items-center gap-1 flex-col cursor-pointer"
          >
            <h1 className="text-main_dark_violet_color dark:text-main_light_purple md:text-5xl text-6xl font-[500]">
              {profileUser?.followers?.length}
            </h1>
            <p className="text-text_black text-sm dark:text-white font-[500]">
              Followers
            </p>
          </div>
          <div
            onClick={() => handleViewFollowers("following")}
            className="flex items-center gap-1 flex-col cursor-pointer"
          >
            <h1 className="text-main_dark_violet_color dark:text-main_light_purple md:text-5xl text-6xl font-[500]">
              {profileUser?.following?.length}
            </h1>
            <p className="text-text_black dark:text-white text-sm font-[500]">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center w-full md:w-fit justify-center gap-4 mt-6">
          <button
            onClick={handleEditAndFollow}
            className={`${
              editButtonValue === "Request Back" && "opacity-70"
            } bg-main_dark_violet_color dark:drop-shadow-md hover:bg-main_light_purple transition text-white border-[1px] flex items-center gap-2 border-main_dark_violet_color py-4 px-6 rounded-xl`}
            disabled={loading}
          >
            {user?._id === id && <PiNotePencilThin className="text-xl" />}
            <span>{editButtonValue}</span>
          </button>
          <button
            onClick={handleShare}
            className="bg-white border-[1px] dark:drop-shadow-md  hover:bg-gray-50 transition flex items-center gap-2 border-black py-4 px-6 rounded-xl"
          >
            <PiShareThin className="text-xl" />
          </button>
          {user?._id !== id && (
            <button
              onClick={() => navigate(`/chat/${id}`)}
              className="bg-white border-[1px] dark:drop-shadow-md  hover:bg-gray-50 transition flex items-center gap-2 border-black py-4 px-6 rounded-xl"
            >
              <FaSms className="text-xl" />
            </button>
          )}
        </div>
      </div>

      <ViewFollowersModal
        data={selectedFollowersData}
        isOpen={viewFollowersModal}
        onClose={() => setViewFollowersModal(false)}
      />
    </>
  );
};

export default FollowersSection;
