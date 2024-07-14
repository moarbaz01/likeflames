import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import hand from "../assets/hand.png";
import downHand from "../assets/down_hand.png";
import lock from "../assets/lock.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loaders/Loader";
import { LOGIN } from "../services/api";
import apiRequest from '../services/apiRequest'
import { login } from '../redux/slicers/user'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const { error, user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  // Login User Handler----------------
  const loginUserHandler =
    useCallback(async () => {
      const data = { username, password };
      try {
        const response = await apiRequest({
          method: "post",
          url: LOGIN,
          data,
        });
        if (response.data.user) {
          dispatch(login(response.data.user));
          navigate("/");
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }, [username, password, dispatch, navigate]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (username.length === 0 || password.length === 0) {
        return toast.error("Please fill all the fields");
      }
      loginUserHandler();
    },
    [username, password, loginUserHandler]
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-text_black dark:text-main_light_purple text-2xl">
            Continue
          </h1>
          <img className="h-8 w-8" src={hand} alt="Hand waving" />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black dark:text-white font-[500]">
            Enter Your Username Or Email
          </span>
          <img className="h-4 w-4" src={downHand} alt="Hand pointing down" />
        </div>
        <input
          type="text"
          name="username"
          className="bg-transparent dark:text-white w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
          placeholder="Username Or Email"
          onChange={handleChange}
          value={username}
          aria-label="Username or Email"
        />
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black dark:text-white font-[500]">
            Enter Your Password
          </span>
          <img className="h-4 w-4" src={lock} alt="Lock icon" />
        </div>
        <div className="relative">
          <input
            type={eye ? "text" : "password"}
            name="password"
            className="bg-transparent w-full dark:text-white text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            aria-label="Password"
          />
          {eye ? (
            <FaRegEye
              onClick={() => setEye(false)}
              className="text-main_dark_violet_color absolute right-4 top-6 cursor-pointer"
              aria-label="Hide password"
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setEye(true)}
              className="text-main_dark_violet_color absolute right-4 top-6 cursor-pointer"
              aria-label="Show password"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-sm mt-4 flex items-center justify-center h-12 bg-main_dark_violet_color text-white font-bold"
          aria-label="Login"
        >
          {isLoading ? <Loader /> : "Login"}
        </button>
        <div className="flex flex-col gap-1 mt-4">
          <span className="text-text_black dark:text-white">
            Create a new account?
          </span>
          <Link
            to="/signup"
            className="text-lg text-main_light_purple font-bold"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
