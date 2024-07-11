import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdEmojiEmotions } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function useEmoji({ setText, showPicker, setShowPicker }) {
  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  const PickEmojiComponent = () => {
    return (
      <MdEmojiEmotions
        className=" hidden dark:text-white md:block text-2xl cursor-pointer"
        onClick={handleShowPicker}
      />
    );
  };

  const EmojiPickerComponent = () => {
    return (
      showPicker && (
        <div className="absolute top-12 right-12 z-[1000]">
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
      )
    );
  };

  return {
    handleShowPicker,
    handleEmojiSelect,
    PickEmojiComponent,
    EmojiPickerComponent,
  };
}

export default useEmoji;
