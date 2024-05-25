import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RxCross1 } from "react-icons/rx";
import { MdEmojiEmotions } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

function PostModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState([]);

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prev) => [
      ...prev,
      ...imageFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  useEffect(() => {
    return () => {
      // Clean up created object URLs to avoid memory leaks
      images.forEach(URL.revokeObjectURL);
    };
  }, [images]);

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={` bg-[rgba(0,0,0,0.61)] items-center flex justify-center fixed z-[1000] top-0 left-0 h-screen w-full`}
    >
      <div className="md:h-3/4 h-full w-full md:w-1/3 overflow-y-scroll bg-white md:rounded-xl">
        <div className=" flex justify-end p-4">
          <button onClick={onClose} className=" text-2xl text-gray-400">
            &times;
          </button>
        </div>
        <div className=" p-4 relative">
          <h1 className=" text-2xl font-bold">Create Post</h1>
          <p className=" text-sm text-gray-400">
            Create a post and share your thoughts with the world
          </p>
          {/* File Uploads */}
          <div className=" flex items-center gap-4 flex-wrap">
            <label
              htmlFor="file"
              className=" text-sm text-gray-400 flex flex-col text-center w-fit gap-2 cursor-pointer  "
            >
              <div className=" flex items-center justify-center text-4xl bg-gray-100 hover:bg-gray-200 transition mt-4 rounded-xl h-24 w-24">
                <CiCirclePlus />
              </div>
              <div className="">Upload file</div>
            </label>
            {images.map((item, index) => {
              return (
                <img
                  key={index}
                  className=" h-24 w-24 object-cover rounded-xl"
                  src={item}
                  alt=""
                />
              );
            })}
          </div>
          <input
            className=" w-full hidden p-2 border-[1px] border-gray-300 rounded-md mt-4"
            onChange={fileHandler}
            type="file"
            id="file"
            accept="image/*"
            multiple
          />
          {/* Text Area */}
          <textarea
            value={text}
            placeholder="What's on your mind?"
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowPicker(false)}
            className=" w-full h-[160px] md:h-[200px] p-2 border-[1px] border-gray-300 outline-main_dark_violet_color rounded-md mt-4 resize-none"
          />
          {showPicker && (
            <div className="absolute bottom-0 right-10 z-[999] w-fit">
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
          <MdEmojiEmotions
            className=" hidden md:block text-2xl cursor-pointer"
            onClick={handleShowPicker}
          />
          <button className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2 mt-4">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
