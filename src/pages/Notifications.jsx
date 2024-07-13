import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import { requests } from "../data";
import { BsHeartFill } from "react-icons/bs";
import BlankProfile from "../assets/blankProfile.png"
import { useSelector } from "react-redux";
import useDate from "../hooks/useDate";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { ACCEPT_AND_REJECT_REQUEST } from "../services/api";
import { fetchUser } from "../redux/slicers/user";

const RequestNotificationItem = ({ notification, handleGetDate, handleAcceptAndRejectRequest, loading }) => (
  <div
    className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md animate-slideDown hover:bg-white/80 transition cursor-pointer w-full md:flex-row flex-col flex md:items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
  >
    <div className="flex items-start ">
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={notification?.from?.profilePicture || BlankProfile}
        alt=""
      />
      <div className=" pl-4">
        <h1 className=" font-[500] text-main_dark_violet_color dark:text-main_light_purple">
          {notification?.from?.name}
        </h1>
        <div
          className={`${notification?.type === "like" &&
            "flex items-center"
            }  gap-2 md:pr-2`}
        >
          {notification?.type === "like" && (
            <BsHeartFill fill="red" />
          )}
          <p className=" text-md dark:text-white">
            {notification?.info}
          </p>
          <p className=" opacity-60 dark:opacity-100 dark:text-gray-400 mt-2   text-sm">
            {handleGetDate(notification?.createdAt)}
          </p>
        </div>
      </div>
    </div>
    {notification.type === "request" && (
      <div className=" flex items-center justify-center md:mt-0 mt-2 gap-2">
        <button
          disabled={loading}
          onClick={() =>
            handleAcceptAndRejectRequest(
              notification._id,
              "accept"
            )
          }
          className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2"
        >
          Accept
        </button>
        <button
          disabled={loading}
          onClick={() =>
            handleAcceptAndRejectRequest(
              notification._id,
              "reject"
            )
          }
          className=" bg-main_bg_white border-[1px] border-black rounded-full text-black px-8 py-2"
        >
          Reject
        </button>
      </div>
    )}
  </div>
)

const NotificationItem = ({ notification }) => (
  <div
    className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full md:flex-row flex-col flex md:items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
  >
    <div className="flex items-start ">
      <img
        className="h-8 w-8"
        src={notification.from.profilePicture || BlankProfile}
        alt=""
      />
      <div className=" pl-4">
        <h1 className=" font-[500] text-main_dark_violet_color dark:text-main_light_purple">
          {notification.from.name}
        </h1>
        <p className=" dark:opacity-100 dark:text-gray-400  opacity-60 hidden md:block text-sm">
          {handleGetDate(notification.createdAt)}
        </p>
        <div
          className={`${notification.type === "like" && "flex items-center"
            }  gap-2 md:pr-2`}
        >
          {notification.type === "like" && (
            <BsHeartFill fill="red" />
          )}
          <p className=" text-md dark:text-white">
            {notification.info}
          </p>
        </div>
      </div>
    </div>
    <p className=" opacity-60 dark:text-gray-400 dark:opacity-100 mt-2  md:hidden text-sm">
      {notification.time}
    </p>
  </div>
)

function Notifications() {
  const [showRequest, setShowRequest] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const { handleGetDate } = useDate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAcceptAndRejectRequest = useCallback(
    async (id, action) => {
      try {
        setLoading(true);
        const res = await apiRequest({
          method: "put",
          url: ACCEPT_AND_REJECT_REQUEST,
          data: { notificationId: id, action },
          token,
        });
        dispatch(fetchUser(token));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchUser]
  );

  const filteredNotifications = useMemo(
    () =>
      user?.notifications?.filter((item) => {
        return item.type !== "request";
      }),
    [user, handleAcceptAndRejectRequest, fetchUser]
  );

  
  const filteredRequests = useMemo(
    () =>
      user?.notifications?.filter((item) => {
        return item.type === "request";
      }),
    [user, handleAcceptAndRejectRequest, fetchUser]
  );

  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto md:h-full h-auto md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">
            {/* Notification on social media */}

            <h1 className=" text-lg font-[400] text-gray-500">Requests</h1>

            <div
              onClick={() => setShowRequest(!showRequest)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white text-black">Requests</h1>
              {filteredRequests?.length === 0 ? (
                <p className=" opacity-60 dark:text-white">No requests</p>
              ) : (
                <div className=" bg-main_dark_violet_color text-white h-8 w-8 flex items-center justify-center rounded-full">
                  {filteredRequests?.length}
                </div>
              )}
            </div>

            <div>
              {filteredRequests?.length > 0 &&
                showRequest &&
                filteredRequests?.map((notification, index) => {
                  return (
                    <RequestNotificationItem key={index} loading={loading} notification={notification} handleGetDate={handleGetDate} handleAcceptAndRejectRequest={handleAcceptAndRejectRequest} />
                  );
                })}
            </div>
            {/* Notification on social media   */}
            <div className="flex items-center mt-4 justify-between">
              <h1 className=" text-lg font-[400] text-gray-500">
                Notifications
              </h1>
              <button className="px-2 bg-red-500 text-white rounded-lg">
                Clear
              </button>
            </div>

            {filteredNotifications?.length > 0 &&
              filteredNotifications?.map((notification, index) => {
                return (
                  <NotificationItem key={index} notification={notification} />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
