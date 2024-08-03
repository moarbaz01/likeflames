import { useNavigate } from "react-router-dom";
import React, { useCallback, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BiLeftArrowAlt, BiSolidDownArrow } from "react-icons/bi";
import { FcCamera } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import BlankProfile from "../assets/blankProfile.png";
import { MdEmojiEmotions } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import apiRequest from "../services/apiRequest";
import { CHANGE_PASSWORD, UPDATE_INFORMATION } from "../services/api";
import toast from "react-hot-toast";
import { fetchUser } from "../redux/slicers/user";
import BackNavigate from "../components/Layout/BackNavigate";

function EditProfile() {
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const { isUser, user, token } = useSelector((state) => state.user);
  const [username, setUsername] = useState(isUser ? user?.username : "");
  const [image, setImage] = useState(
    user?.profilePicture ? user.profilePicture : BlankProfile
  );
  const [name, setName] = useState(isUser ? user?.name : "");
  const [profileType, setProfileType] = useState(user?.privacy);
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [bio, setBio] = useState(user?.bio ? user?.bio : "");
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setBio((prev) => prev + emoji.native);
  };

  const handleProfileTypeSubmit = async () => {
    setLoading(true);
    if (profileType === user?.privacy) {
      toast.error("You have already selected this option");
      setLoading(false);
      return;
    }
    try {
      const res = await apiRequest({
        method: "put",
        url: UPDATE_INFORMATION,
        data: { privacy: profileType },
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchUser(token));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const imageChangeHandler = () => {
    const file = document.getElementById("profileImage").files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      return toast.error("Please fill all the fields");
    }
    if (oldPassword === newPassword) {
      return toast.error("New password cannot be same as old password");
    }
    if (newPassword.length < 8) {
      return toast.error("New Password must be at least 8 characters long");
    }
    if (!newPassword.match(/[a-z]/g)) {
      return toast.error(
        "New Password must contain at least one lowercase letter"
      );
    }
    if (!newPassword.match(/[A-Z]/g)) {
      return toast.error(
        "New Password must contain at least one uppercase letter"
      );
    }
    if (!newPassword.match(/[0-9]/g)) {
      return toast.error("New Password must contain at least one number");
    }
    if (!newPassword.match(/[^a-zA-Z0-9]/g)) {
      return toast.error(
        "New Password must contain at least one special character"
      );
    }

    setLoading(true);
    loadingRef.current = toast.loading("Updating password");
    try {
      const res = await apiRequest({
        method: "put",
        url: CHANGE_PASSWORD,
        data: { oldPassword, newPassword },
        token,
      });
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      // Dismiss the loading toast
      toast.dismiss(loadingRef.current);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleDeleteAccount = useCallback(() => {
    toast.error("Delete Account functionality is not implemented yet");
  }, []);

  const handleSaveInformation = async (e) => {
    e.preventDefault();
    setLoading(true);
    loadingRef.current = toast.loading("Updating information");
    const formData = new FormData();
    if (user.name !== name) {
      formData.append("name", name);
    }
    if (user.username !== username) {
      formData.append("username", username);
    }
    if (user.bio !== bio) {
      formData.append("bio", bio);
    }
    if (file) {
      formData.append("profilePicture", file);
    }

    console.log(formData.get("profilePicture"));
    try {
      const res = await apiRequest({
        method: "put",
        url: UPDATE_INFORMATION,
        data: formData,
        token,
      });
      dispatch(fetchUser());
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      // Dismiss the loading toast
      toast.dismiss(loadingRef.current);
    }
  };

  return (
    <div className="">
      <BackNavigate
        handleNavigateBack={handleNavigateBack}
        message={"Back To Profile"}
      />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto md:h-full h-auto md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">
            {/* Notification on social media */}
            <div
              onClick={() => setShowPersonalInformation((prev) => !prev)}
              className=" bg-main_bg_white dark:bg-dark_secondary_bg dark:drop-shadow-md hover:bg-white/80 transition cursor-pointer w-full flex items-center justify-between rounded-xl md:px-4 px-4 py-4"
            >
              <h1 className=" dark:text-white">Personal Information</h1>

              <BiSolidDownArrow
                className={`text-main_dark_violet_color ${
                  showPersonalInformation ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Personal Information */}
            {showPersonalInformation && (
              <form
                onSubmit={handleSaveInformation}
                className=" mt-4 animate-slideDown mx-2"
              >
                {/* Change Profile Image */}
                <h1 className=" text-lg font-[400] text-gray-500">
                  Profile Image
                </h1>

                <input
                  onChange={imageChangeHandler}
                  type="file"
                  id="profileImage"
                  className=" hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="profileImage"
                  className="justify-center md:w-[50%]  py-4 rounded-2xl mt-4 flex items-center"
                >
                  <div className="relative w-fit">
                    <img
                      src={image}
                      className=" h-40 w-40 object-cover aspect-square border-main_dark_violet_color hover:opacity-80 transition cursor-pointer border-8 rounded-full"
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                {/* Username */}
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Edit Name
                </h1>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                {/* Username */}
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Edit Bio
                </h1>

                <textarea
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Your bio"
                  className=" w-full md:w-[50%] block px-4 py-2 h-32 resize-none border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                <MdEmojiEmotions
                  className=" hidden md:block dark:text-white text-2xl mt-2 cursor-pointer"
                  onClick={handleShowPicker}
                />

                {showPicker && (
                  <div className="absolute md:top-8 right-20 z-[1000]">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme="dark"
                      autoFocusSearch={false}
                    />
                    <RxCross1
                      className=" absolute top-1 text-xl cursor-pointer -right-8 "
                      onClick={() => setShowPicker(!showPicker)}
                    />
                  </div>
                )}

                {/* Save Button */}
                <button
                  disabled={loading}
                  className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4"
                >
                  Save
                </button>
              </form>
            )}

            <div
              onClick={() => setShowChangePassword((prev) => !prev)}
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
              <form
                onSubmit={handleChangePasswordSubmit}
                className=" mt-4 animate-slideDown mx-2"
              >
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  Old Password
                </h1>

                <input
                  type="text"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Your old password"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                <h1 className=" text-md font-[400] text-gray-500 mt-4">
                  New Password
                </h1>

                <input
                  type="text"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  placeholder="Your new password"
                  className=" w-full md:w-[50%] px-4 h-12 block border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                />
                <button
                  disabled={loading}
                  className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4"
                >
                  Change Password
                </button>
              </form>
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
                  onChange={(e) => setProfileType(e.target.value)}
                  value={profileType}
                  className=" w-full md:w-[50%] block px-4 h-12 bg-white border-[1px] border-main_light_purple focus:outline-main_dark_violet_color  rounded-lg mt-2"
                  name=""
                  id=""
                >
                  <option defaultChecked value="public">
                    Public
                  </option>
                  <option defaultChecked value="private">
                    Private
                  </option>
                </select>

                <button
                  onClick={handleProfileTypeSubmit}
                  disabled={loading}
                  className=" w-full md:w-[20%] h-12 bg-main_dark_violet_color text-white rounded-lg mt-4"
                >
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
                <button
                  disabled={loading}
                  onClick={handleDeleteAccount}
                  className=" w-full md:w-[20%] h-12 bg-red-500 text-white rounded-lg mt-4"
                >
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
