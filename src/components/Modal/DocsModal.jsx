import React from "react";
import image from "../../assets/image.png";
import docsImage from "../../assets/google-docs.png";

function DocsModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
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
        <div onClick={(e) => e.stopPropagation()} className=" p-4 relative">
          {/* File Type */}
          <h1 className=" text-2xl font-bold">File Type</h1>
          <p className=" text-sm text-gray-400">
            Select the file type you want to upload
          </p>
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className=" mt-4 flex items-center gap-4">
              <input
                type="file"
                name="fileType"
                className=" cursor-pointer hidden"
                id="image"
              />
              <label htmlFor="image" className=" cursor-pointer text-sm">
                <img className="w-12" src={image} alt="" />
              </label>
            </div>
            {/* Video */}
            <div className=" mt-4 flex items-center gap-4">
              <input
                type="file"
                name="fileType"
                className=" cursor-pointer hidden"
                id="docs"
              />
              <label htmlFor="docs" className=" cursor-pointer text-sm">
                <img className="w-12" src={docsImage} alt="" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsModal;
