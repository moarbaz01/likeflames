import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BiLeftArrowAlt, BiSolidDownArrow } from "react-icons/bi";
import avatar2 from "../assets/avatars/avatar2.png";
import { FcCamera } from "react-icons/fc";

function EditProfile() {
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const imageChangeHandler = () => {
    const file = document.getElementById("profileImage").files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className=" md:pb-0 pb-24 ">
      <div className="md:block hidden">
        <Navbar />
      </div>
      {/* Back  */}
      <div className=" bg-main_bg_white dark:bg-dark_main_bg left-0 h-16 w-full md:hidden  px-4 md:px-8">
        <div className=" flex items-center h-full my-auto justify-between">
          <div
            onClick={() => navigate("/profile")}
            className=" text-2xl font-bold  flex items-center gap-4 cursor-pointer text-main_dark_violet_color"
          >
            <BiLeftArrowAlt className=" text-3xl" />
            Edit Profile
          </div>
        </div>
      </div>
      <div className="relative  mx-auto md:max-w-[1400px] md:px-4 mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] mx-2 md:mx-0 flex items-start justify-between gap-4 ">
          <div className=" w-full md:h-[90vh] rounded-xl  md:overflow-y-scroll">
            {/* Notification on social media */}
            <div
              onClick={() =>
                setShowPersonalInformation(!showPersonalInformation)
              }
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white">Personal Information</h1>

              <BiSolidDownArrow
                className={`text-main_dark_violet_color ${
                  showPersonalInformation && "rotate-180"
                }`}
              />
            </div>

            {/* Personal Information */}
            {showPersonalInformation && (
              <div className=" mt-4 animate-slideDown mx-2">
                {/* Change Profile Image */}
                <h1 className=" text-lg font-[400] text-gray-500">
                  Profile Image
                </h1>

                <input
                  onChange={imageChangeHandler}
                  type="file"
                  id="profileImage"
                  className=" hidden"
                />
                <label
                  htmlFor="profileImage"
                  className="justify-center md:w-[50%] bg-white py-4 rounded-2xl mt-4 flex items-center"
                >
                  <div className="relative w-fit">
                    <img
                      src={image || avatar2}
                      className=" h-40 w-40 border-main_dark_violet_color hover:opacity-80 transition cursor-pointer border-8 shadow-2xl shadow-white rounded-full"
                      alt=""
                    />
                    <FcCamera className=" absolute bottom-0 right-0 text-2xl cursor-pointer" />
                  </div>
                </label>

                {/* Username */}
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Edit Username
                </h1>

                <input
                  type="text"
                  placeholder="Your username"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                {/* Username */}
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Edit Name
                </h1>

                <input
                  type="text"
                  placeholder="Your name"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                {/* Username */}
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Edit Bio
                </h1>

                <textarea
                  type="text"
                  placeholder="Your bio"
                  className=" w-full md:w-[50%] block px-4 py-2 h-32 resize-none border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />

                {/* Save Button */}
                <button className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4">
                  Save
                </button>
              </div>
            )}

            <div
              onClick={() => setShowChangePassword(!showChangePassword)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white">Change Password</h1>
              <BiSolidDownArrow
                className={`text-main_dark_violet_color ${
                  showChangePassword && "rotate-180"
                }`}
              />
            </div>

            {showChangePassword && (
              <div className=" mt-4 animate-slideDown mx-2">
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Old Password
                </h1>

                <input
                  type="text"
                  placeholder="Your old password"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  New Password
                </h1>

                <input
                  type="text"
                  placeholder="Your new password"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                <button className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4">
                  Change Password
                </button>
              </div>
            )}

            <div
              onClick={() => setShowPrivacy(!showPrivacy)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white">Privacy</h1>

              <BiSolidDownArrow
                className={`text-main_dark_violet_color ${
                  showPrivacy && "rotate-180"
                }`}
              />
            </div>

            {/* Privacy Edit */}
            {showPrivacy && (
              <div className=" animate-slideDown mt-4 mx-2">
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Profile Type
                </h1>

                <select
                  className=" w-full md:w-[50%] block px-4 h-12 bg-white border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                  name=""
                  id=""
                >
                  <option value="">Public</option>
                  <option value="">Private</option>
                </select>

                <button className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4">
                  Save
                </button>
              </div>
            )}

            <div
              onClick={() => setShowSecurity(!showSecurity)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between mt-4 rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white">Security</h1>

              <BiSolidDownArrow
                className={`text-main_dark_violet_color ${
                  showSecurity && "rotate-180"
                }`}
              />
            </div>

            {showSecurity && (
              <div className=" animate-slideDown mt-4 mx-2">
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Delete Account
                </h1>
                <p className=" text-sm text-gray-500">
                  This action cannot be undone.
                </p>
                <button className=" w-full md:w-[20%] h-12 bg-red-500 text-white rounded-lg mt-4">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
