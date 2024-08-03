import { BiLeftArrowAlt } from "react-icons/bi";

function BackNavigate({ handleNavigateBack, message }) {
  return (
    <div className=" bg-main_bg_white dark:bg-dark_main_bg left-0 h-16 w-full md:hidden py-2  px-4 ">
      <div className=" flex items-center h-full my-auto justify-between">
        <div
          onClick={handleNavigateBack}
          className=" text-2xl font-bold  flex items-center gap-4 cursor-pointer text-main_dark_violet_color"
        >
          <BiLeftArrowAlt className=" text-3xl" />
          {message || "Back"}
        </div>
      </div>
    </div>
  );
}

export default BackNavigate;
