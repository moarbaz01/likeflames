import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import downHand from "../assets/down_hand.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { RESET_PASSWORD } from "../services/api";
import Loader from "../components/Loaders/Loader";

function Password() {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [searchParams] = useSearchParams();
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetPassword = useCallback(async () => {
    if (!token || !id) {
      toast.error("Invalid Request...");
      return;
    }
    setLoading(true);
    try {
      const res = await apiRequest({
        method: "post",
        url: RESET_PASSWORD,
        data: { token, id, ...data },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token, id, data]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (data.newPassword.length === 0 || data.confirmPassword.length === 0) {
        toast.error("Password and Confirm Password can't be empty");
        return;
      }
      if (data.newPassword.length < 8) {
        return toast.error("New Password must be at least 8 characters long");
      }
      if (!data.newPassword.match(/[a-z]/g)) {
        return toast.error(
          "New Password must contain at least one lowercase letter"
        );
      }
      if (!data.newPassword.match(/[A-Z]/g)) {
        return toast.error(
          "New Password must contain at least one uppercase letter"
        );
      }
      if (!data.newPassword.match(/[0-9]/g)) {
        return toast.error("New Password must contain at least one number");
      }
      if (!data.newPassword.match(/[^a-zA-Z0-9]/g)) {
        return toast.error(
          "New Password must contain at least one special character"
        );
      }

      if (data.newPassword !== data.confirmPassword) {
        return toast.error("New Password and confirm should be match");
      }
      resetPassword();
    },
    [data]
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col"
      >
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black font-[500] dark:text-white">
            New Password
          </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <div className="relative">
          <input
            type={!passwordEye ? "password" : "text"}
            name="newPassword"
            className="bg-transparent w-full text-text_black dark:text-white border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            onChange={handleChange}
            value={data.newPassword}
          />
          {passwordEye ? (
            <FaRegEye
              onClick={() => setPasswordEye(false)}
              className="text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setPasswordEye(true)}
              className="text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
            />
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black dark:text-white font-[500]">
            Confirm Password
          </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <div className="relative">
          <input
            type={!confirmPasswordEye ? "password" : "text"}
            name="confirmPassword"
            className="bg-transparent w-full text-text_black dark:text-white border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            onChange={handleChange}
            value={data.confirmPassword}
          />
          {confirmPasswordEye ? (
            <FaRegEye
              onClick={() => setConfirmPasswordEye(false)}
              className="text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setConfirmPasswordEye(true)}
              className="text-main_dark_violet_color dark:text-white absolute right-4 top-6 cursor-pointer"
            />
          )}
        </div>

        <button
          type="submit"
          className={`w-full rounded-sm mt-4 h-12 ${
            loading ? "opacity-70" : "opacity-100"
          } bg-main_dark_violet_color text-white font-bold`}
        >
          {loading ? <Loader /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default Password;
