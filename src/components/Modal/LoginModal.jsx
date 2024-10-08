import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigateLogin = useCallback(() => {
    onClose();
    navigate("/login");
  }, [navigate]);
  const handleNavigateSignup = useCallback(() => {
    onClose();
    navigate("/signup");
  }, [navigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="fixed flex items-center backdrop-blur-sm justify-center top-0  left-0 right-0 bottom-0 z-[1000] bg-black/40">
      <div className="h-full flex flex-col items-center justify-center rounded-xl relative md:h-1/4 w-full md:w-1/3 bg-white">
        <button
          onClick={onClose}
          className=" text-2xl absolute top-4 right-4 cursor-pointer text-gray-400"
        >
          &times;
        </button>
        <h1 className="text-xl  text-main_dark_violet_color font-bold ">
          Login First!
        </h1>
        <h1 className="text-lg  text-slate-500  ">
          You are not logged in user!
        </h1>
        <div className="flex items-center mt-4 gap-4 ">
          <button
            onClick={handleNavigateLogin}
            className=" h-12 px-6 bg-main_dark_violet_color text-white p-1 rounded-xl"
          >
            Login
          </button>
          or
          <button
            onClick={handleNavigateSignup}
            className=" h-12 px-6 bg-main_dark_violet_color text-white p-1 rounded-xl"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
