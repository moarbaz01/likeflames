import React, { useEffect, useState } from "react";
import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";
import avatar5 from "../assets/avatars/avatar5.png";
import avatar6 from "../assets/avatars/avatar6.png";
import avatar7 from "../assets/avatars/avatar7.png";
import avatar8 from "../assets/avatars/avatar8.png";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaPlusSquare } from "react-icons/fa";

function Avatar() {
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const avatarsArr = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
  ];

  function handleImage(e) {
    if (e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0]);
      setFile(image);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Submited");
  }

  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <div className="flex items-center h-screen max-w-screen justify-center">
      <form onSubmit={handleSubmit} className="lg:w-1/3 w-[80%]">
        <Link className=" flex items-center gap-4 mb-4 text-text_black text-xl">
          <FaArrowLeft className=" text-main_dark_violet_color" />
          <span className="text-lg">Prev</span>
        </Link>
        <h1 className=" text-xl text-text_black font-[500] my-4">Choose Your Avatar</h1>
        <div className=" flex justify-start items-center mt-2 flex-wrap ">
          {avatarsArr.map((a, index) => {
            return (
              <img
                onClick={() => setImage(a)}
                className={`cursor-pointer rounded-full transition h-20 w-20 m-2 ${
                  image !== a
                    ? ""
                    : "border-[5px] border-main_dark_violet_color"
                }`}
                src={a}
                key={index}
              />
            );
          })}
          {file && (
            <img
              onClick={() => setImage(file)}
              className={`cursor-pointer rounded-full transition h-20 w-20 m-2 ${
                image !== file
                  ? ""
                  : "border-[5px] border-main_dark_violet_color"
              }`}
              src={file}
            />
          )}
          <label
            htmlFor="avatar"
            className="cursor-pointer rounded-full bg-main_light_purple flex items-center justify-center h-20 w-20 m-2"
          >
            <FaPlusSquare />
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="avatar"
            name="avatar"
            className=" hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-sm mt-4 h-12 bg-main_dark_violet_color text-white font-bold"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}

export default Avatar;
