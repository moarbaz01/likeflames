import { useNavigate } from "react-router-dom";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

function ViewFileModal({ isOpen, onClose, file }) {
  if (!isOpen) return null;
  const [index, setIndex] = React.useState(0);
  return (
    <div
      className={` bg-[rgba(0,0,0,0.61)] items-center ${
        isOpen ? "flex" : "hidden"
      } justify-center fixed z-[999] bottom-0 left-0 h-screen w-full`}
    >
      <div className=" md:h-auto relative w-full md:w-1/3 overflow-y-hidden md:rounded-xl">
        <div className=" absolute z-[1000] right-0 top-0 p-4">
          <button onClick={onClose} className=" text-2xl text-gray-400">
            &times;
          </button>
        </div>
        <div className=" h-full w-full relative flex items-center justify-center">
          {Array.isArray(file) ? (
            <img
              src={file[index]}
              className="  w-[80%]  object-contain"
              alt=""
            />
          ) : (
            <img
              className="  w-[80%] mx-auto object-contain"
              src={file}
              alt=""
            />
          )}

          {Array.isArray(file) && file.length > 1 && (
            <BiLeftArrowAlt
              onClick={() =>
                setIndex((prev) => (prev - 1 + file.length) % file.length)
              }
              className="text-white text-3xl cursor-pointer left-2 absolute z-[50]"
            />
          )}
          {Array.isArray(file) && file.length > 1 && (
            <BiRightArrowAlt
              onClick={() => setIndex((prev) => (prev + 1) % file.length)}
              className="text-white text-3xl cursor-pointer right-2 absolute z-[50]"
            />
          )}

          {Array.isArray(file) && file.length > 1 && (
            <p className="absolute top-4 left-12 md:left-20 text-white">
              {index + 1} / {file.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewFileModal;
