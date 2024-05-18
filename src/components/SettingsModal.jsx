import React from "react";

function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className={` bg-[rgba(0,0,0,0.61)] items-center ${
        isOpen ? "flex" : "hidden"
      } justify-center fixed z-[999] top-0 left-0 h-screen w-full`}
    >
      <div className=" h-full md:h-auto relative w-full md:w-1/3 overflow-y-scroll bg-white md:rounded-xl">
        <div className=" flex absolute z-[1000] right-0 top-0 p-4">
          <button onClick={onClose} className=" text-2xl text-gray-400">
            &times;
          </button>
        </div>
        <div className=" p-4 relative">
          {/* <h1 className=" text-2xl font-bold">Settings</h1>
          <p className=" text-sm text-gray-400">
            Customize your profile and manage your account settings
          </p> */}

          {/* Select theme */}
          <div className=" mt-4">
            <h2 className=" text-lg font-bold">Select Theme</h2>
            <p className=" text-sm text-gray-400">
              Select a theme to personalize your experience
            </p>
            {/* Radio buttons */}
            <div className=" mt-4 flex items-center gap-4">
              <input
                type="radio"
                name="theme"
                className=" cursor-pointer"
                id="light"
              />
              <label htmlFor="light" className=" cursor-pointer text-sm">
                Light
              </label>
              <input
                type="radio"
                name="theme"
                className=" cursor-pointer"
                id="dark"
              />
              <label htmlFor="dark" className=" cursor-pointer text-sm">
                Dark
              </label>
            </div>
          </div>

          <button className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2 mt-4">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
