import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import apiRequest from "../services/apiRequest";
import { GENERATE_RESET_TOKEN } from "../services/api";
import Loader from "../components/Loaders/Loader";

function SendResetLink() {
  const [email, setEmail] = useState("");
  const loadingRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const genereteResetLink = useCallback(async () => {
    loadingRef.current = toast.loading("Processing...");
    setLoading(true);
    try {
      const res = await apiRequest({
        method: "post",
        url: GENERATE_RESET_TOKEN,
        data: { email },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      toast.dismiss(loadingRef.current);
      setLoading(false);
    }
  }, [email]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email.length === 0) {
        toast.error("Email cannot be empty");
        return;
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        toast.error("Invalid email address");
        return;
      }
      genereteResetLink();
    },
    [email]
  );
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col "
      >
        <div className=" flex items-center gap-4">
          <h1 className="text-text_black dark:text-main_light_purple text-2xl font-[500]"></h1>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className=" text-text_black text-white font-[500]">
            Enter Your Email{" "}
          </span>
        </div>
        <div>
          <input
            type="text"
            name="email"
            className=" bg-transparent dark:text-white w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-sm mt-4 h-12 ${
            loading ? "opacity-70" : "opacity-100"
          } bg-main_dark_violet_color text-white font-bold`}
        >
          {loading ? <Loader /> : "Generate Link"}
        </button>
        <div className=" flexflex-col gap-1 mt-4 ">
          <span className=" text-text_black dark:text-white">Back To? </span>
          <Link
            to={"/login"}
            className="text-lg text-main_light_purple font-bold"
          >
            Login{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SendResetLink;
