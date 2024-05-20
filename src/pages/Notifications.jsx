import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";
// import { requests } from "../data";
import { BsHeartFill } from "react-icons/bs";

const notificationData = [
  //   Someone sends you request notifications

  {
    sender: {
      name: "Sameer Khan",
      avatar: avatar2,
    },
    message: `Sameer Khan sends you request `,
    time: "1 min ago",
    type: "request",
  },
  {
    sender: {
      name: "Modi Ji",
      avatar: avatar3,
    },
    message: `Modi ji liked your post`,
    time: "1 min ago",
    type: "like",
  },
  {
    sender: {
      name: "Ravina",
      avatar: avatar4,
    },
    message: `Ravina added new post check it now`,
    time: "24 min ago",
    type: "post",
  },
  {
    sender: {
      name: "Modi Ji",
      avatar: avatar3,
    },
    message: "Modi Sents you request",
    type: "request",
    time: "24 min ago",
  },
];

const filteredNotifications = notificationData.filter((item) => {
  return item.type !== "request";
});
const filteredRequests = notificationData.filter((item) => {
  return item.type === "request";
});

function Notifications() {
  const [showRequest, setShowRequest] = useState(false);

  return (
    <div className=" md:pb-0 pb-24 ">
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="relative  mx-auto md:max-w-[1400px] md:px-4 mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mr-6 flex items-start justify-between gap-4 ">
          <div className=" w-full md:h-[90vh] rounded-xl overflow-y-scroll">
            {/* Notification on social media */}

            <h1 className=" text-lg font-[400] text-gray-500">Requests</h1>

            <div
              onClick={() => setShowRequest(!showRequest)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg text-white dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
            >
              <h1>Requests</h1>
              {filteredRequests.length === 0 ? (
                <p className=" opacity-60">No requests</p>
              ) : (
                <div className=" bg-main_dark_violet_color text-white h-8 w-8 flex items-center justify-center rounded-full">
                  {filteredRequests.length}
                </div>
              )}
            </div>

            <div>
              {filteredRequests.length > 0 &&
                showRequest &&
                filteredRequests.map((notification, index) => {
                  return (
                    <div
                      key={index}
                      className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md animate-slideDown hover:bg-white/80 transition cursor-pointer w-full md:flex-row flex-col flex md:items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
                    >
                      <div className="flex items-start ">
                        <img
                          className="h-8 w-8"
                          src={notification.sender.avatar}
                          alt=""
                        />
                        <div className=" pl-4">
                          <h1 className=" font-[500] text-main_dark_violet_color dark:text-main_light_purple">
                            {notification.sender.name}
                          </h1>
                          <div
                            className={`${
                              notification.type === "like" &&
                              "flex items-center"
                            }  gap-2 md:pr-2`}
                          >
                            {notification.type === "like" && (
                              <BsHeartFill fill="red" />
                            )}
                            <p className=" text-md dark:text-white">{notification.message}</p>
                          </div>
                          <p className=" opacity-60 dark:opacity-100 dark:text-gray-400 hidden md:block text-sm">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      {notification.type === "request" && (
                        <div className=" flex items-center justify-center md:mt-0 mt-2 gap-2">
                          <button className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2">
                            Accept
                          </button>
                          <button className=" bg-main_bg_white border-[1px] border-black rounded-full text-black px-8 py-2">
                            Reject
                          </button>
                        </div>
                      )}
                      <p className=" opacity-60 dark:opacity-100 dark:text-gray-400 mt-2   md:hidden text-sm">
                        {notification.time}
                      </p>
                    </div>
                  );
                })}
            </div>
            {/* Notification on social media   */}
            <h1 className=" text-lg font-[400] mt-4 text-gray-500">
              Notifications
            </h1>

            {filteredNotifications.map((notification, index) => {
              return (
                <div
                  key={index}
                  className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full md:flex-row flex-col flex md:items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
                >
                  <div className="flex items-start ">
                    <img
                      className="h-8 w-8"
                      src={notification.sender.avatar}
                      alt=""
                    />
                    <div className=" pl-4">
                      <h1 className=" font-[500] text-main_dark_violet_color dark:text-main_light_purple">
                        {notification.sender.name}
                      </h1>
                      <div
                        className={`${
                          notification.type === "like" && "flex items-center"
                        }  gap-2 md:pr-2`}
                      >
                        {notification.type === "like" && (
                          <BsHeartFill fill="red" />
                        )}
                        <p className=" text-md dark:text-white">{notification.message}</p>
                      </div>
                      <p className=" dark:opacity-100 dark:text-gray-400  opacity-60 hidden md:block text-sm">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <p className=" opacity-60 dark:text-gray-400 dark:opacity-100 mt-2  md:hidden text-sm">
                    {notification.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
