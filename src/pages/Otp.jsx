import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import downHand from "../assets/down_hand.png";
import { SignupContext } from "../context/useSignup";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { SENDOTP } from "../services/api";

function Otp() {
  const { email, handleSignup, sessionExpiredHandler } =
    useContext(SignupContext);
  const [input, setInput] = useState(["", "", "", ""]);
  const loadingRef = useRef(null);
  const [otpSend, setOtpSend] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    let intervalId;
    if (otpSend) {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setOtpSend(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [otpSend]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email === "") {
        sessionExpiredHandler();
        return;
      }
      const tempOtp = input.join("");
      handleSignup(parseInt(tempOtp));
    },
    [input, email, sessionExpiredHandler]
  );

  const sendOtpHandler = useCallback(async () => {
    if (email === "") {
      sessionExpiredHandler();
      return;
    }
    loadingRef.current = toast.loading("Sending OTP...");
    try {
      const res = await apiRequest({
        method: "post",
        url: SENDOTP,
        data: { email },
      });
      toast.success(res.data.message);
      setOtpSend(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      toast.dismiss(loadingRef.current);
    }
  }, [email, sessionExpiredHandler]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newInput = [...input];
    newInput[index] = value;
    setInput(newInput);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyUp = (e, index) => {
    const { value } = e.target;
    if (e.key === "Backspace" && !value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="px-4 md:w-1/3 w-full rounded-md flex justify-center flex-col"
      >
        <div className="flex items-center gap-4">
          <h1 className="text-text_black dark:text-white font-[500] text-2xl">
            Enter 4 Digit OTP
          </h1>
          <img className="h-4 w-4" src={downHand} alt="" />
        </div>

        <div className="flex items-center mt-4 justify-between">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                name={`otp${index + 1}`}
                className="bg-transparent text-3xl dark:text-white text-center w-12 h-12 md:w-16 md:h-16 text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color"
                maxLength={1}
                value={input[index]}
                onChange={(e) => handleInputChange(e, index)}
                inputMode="numeric"
                onKeyUp={(e) => handleKeyUp(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
        </div>

        <button
          type="submit"
          className={`w-full rounded-md mt-4 h-12 ${
            otpSend ? "opacity-70" : "opacity-100"
          } bg-main_dark_violet_color transition hover:opacity-90 text-white font-bold`}
        >
          SUBMIT OTP
        </button>
        <button
          type="button"
          disabled={otpSend}
          onClick={sendOtpHandler}
          className="text-sm w-fit mt-2 hover:opacity-70 transition cursor-pointer text-main_light_purple font-bold"
        >
          {otpSend ? `Send again: ${timer}` : "Resend OTP"}
        </button>
      </form>
    </div>
  );
}

export default Otp;
