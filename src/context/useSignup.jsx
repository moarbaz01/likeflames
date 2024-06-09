import { useRef } from "react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiRequest from "../services/apiRequest";
import { SIGNUP } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slicers/user";

const SignupContext = createContext();

const SignupContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const loadingRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // Import thunkapi

  const resetState = () => {
    setEmail("");
    setConfirmPassword("");
    setPassword("");
    setUsername("");
    setName("");
  };

  const sessionExpiredHandler = () => {
    resetState();
    navigate("/signup");
    toast.error("Session Expired! Please Fill Details Again");
  };

  const loginHandler = () => {
    dispatch(loginUser({ email, password }));
    resetState();
    console.log(user);
  };

  const handleSignup = async (otp) => {
    loadingRef.current = toast.loading("Please wait...");
    try {
      const res = await apiRequest({
        method: "post",
        url: SIGNUP,
        data: {
          name,
          username,
          email,
          password,
          confirmPassword,
          otp,
        },
      });
      console.log(res.data);
      navigate("/");
      toast.success("User successfully registered");
      loginHandler();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingRef.current);
    }
  };

  const value = {
    email,
    setEmail,
    confirmPassword,
    setConfirmPassword,
    password,
    setPassword,
    username,
    setUsername,
    name,
    setName,
    sessionExpiredHandler,
    handleSignup,
  };
  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};

export { SignupContextProvider, SignupContext };
