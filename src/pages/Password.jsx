import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import downHand from "../assets/down_hand.png";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { SignupContext } from "../context/useSignup";
import { IoIosCheckmarkCircle } from "react-icons/io";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { SENDOTP } from "../services/api";

const passwordStrengthData = [
  {
    type: "length",
    text: "Length",
  },
  {
    type: "number",
    text: "Number",
  },
  {
    type: "characters",
    text: "Special Characters",
  },
  {
    type: "uppercase",
    text: "Uppercase",
  },
  {
    type: "lowercase",
    text: "Lowercase",
  },
];

function Password() {
  const {
    email,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    sessionExpiredHandler,
  } = useContext(SignupContext);
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState([]);
  const navigate = useNavigate();
  const loadingRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const sendOtpHandler = useCallback(async () => {
    loadingRef.current = toast.loading("Sending OTP...");
    try {
      const res = await apiRequest({
        method: "post",
        url: SENDOTP,
        data: { email },
      });
      toast.success(res.data.message);
      navigate("/otp");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingRef.current);
    }
  }, []);

  useEffect(() => {
    const strength = [];

    if (password.length >= 8) strength.push("length");
    if (/\d/.test(password)) strength.push("number");
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.push("characters");
    if (/[A-Z]/.test(password)) strength.push("uppercase");
    if (/[a-z]/.test(password)) strength.push("lowercase");

    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length === 0 || confirmPassword.length === 0) {
      toast.error("Password and Confirm Password can't be empty");
      return;
    }

    const requiredStrength = [
      "length",
      "number",
      "characters",
      "uppercase",
      "lowercase",
    ];
    const unmetCriteria = requiredStrength.filter(
      (criteria) => !passwordStrength.includes(criteria)
    );

    if (unmetCriteria.length > 0) {
      toast.error(`Password must include: ${unmetCriteria.join(", ")}`);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (email === "") {
      sessionExpiredHandler();
    } else {
      sendOtpHandler();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 rounded-md flex justify-center flex-col"
      >
        <div
          className="flex items-center gap-4 mb-4 text-text_black text-xl"
          onClick={() => navigate("/name")}
        >
          <FaArrowLeft className="text-main_dark_violet_color" />
          <span className="text-lg dark:text-white">Prev</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-text_black font-[500] dark:text-white">
            Set Password
          </span>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>
        <div className="relative">
          <input
            type={!passwordEye ? "password" : "text"}
            name="password"
            className="bg-transparent w-full text-text_black dark:text-white border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2"
            onChange={handleChange}
            value={password}
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

        <div className="flex flex-wrap gap-4 mt-4">
          {passwordStrengthData.map((e) => (
            <div key={e.type} className="flex items-center gap-2">
              <IoIosCheckmarkCircle
                fill={passwordStrength.includes(e.type) ? "lightgreen" : "gray"}
              />
              <p className="dark:text-gray-200 text-text_black">{e.text}</p>
            </div>
          ))}
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
            value={confirmPassword}
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
          className="w-full rounded-sm mt-4 h-12 bg-main_dark_violet_color text-white font-bold"
        >
          NEXT
        </button>
      </form>
    </div>
  );
}

export default Password;
