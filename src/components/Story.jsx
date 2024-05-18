import React from "react";

function Story({ bg, profile, name }) {
  return (
    <div
    className={`h-[160px] w-[120px] p-2 relative rounded-md shadow-xl bg-cover cursor-pointer`} style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="h-8 w-8  rounded-full border-2 text-start border-main_dark_violet_color">
        <img className="object-cover" src={profile} alt="" />
      </div>
      <h2 className=" absolute w-full bottom-2 text-center text-ellipsis text-text_color">
        {name}
      </h2>
    </div>
  );
}

export default Story;
