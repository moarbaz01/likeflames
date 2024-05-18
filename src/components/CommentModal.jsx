import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdEmojiEmotions } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function CommentModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  return (
    <div
      className={` bg-[rgba(0,0,0,0.61)] items-center ${
        isOpen ? "flex" : "hidden"
      } justify-center fixed z-[999] top-0 left-0 right-0 bottom-0 w-full`}
    >
      <div className=" h-full relative w-full md:w-1/3 overflow-y-scroll bg-white md:rounded-xl">
        <div className=" flex absolute z-[1000] right-0 top-0 p-4">
          <button onClick={onClose} className=" text-2xl text-gray-400">
            &times;
          </button>
        </div>
        <div className=" p-4 relative">
          {/* Create Comment */}
          <div className=" mt-4">
            <h1>Write your comment</h1>
            <textarea
              className=" w-full border border-gray-300 h-[200px] resize-none rounded-lg p-2 mt-2"
              placeholder="Write your comment here..."
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setShowPicker(false)}
              value={text}
            />

            <MdEmojiEmotions
              className=" hidden md:block text-2xl cursor-pointer"
              onClick={handleShowPicker}
            />
          </div>
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

          <button className=" bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2 mt-4">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
