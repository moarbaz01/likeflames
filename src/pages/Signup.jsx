import React from "react";
import hand from "../assets/hand.png";
import { Link } from "react-router-dom";
import downHand from '../assets/down_hand.png'

function Signup() {
    const [email, setEmail] = React.useState("");

    // Handle Submit
    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex items-center justify-center h-screen max-w-screen">
            <form onSubmit={handleSubmit} className="py-12 px-12 w-[90%] sm:w-[40%] lg:w-[30%] rounded-md flex justify-center flex-col ">
                <div className=" flex items-center gap-4">
                    <h1 className="text-text_black text-2xl font-[500]">Welcome</h1>
                    <img className=" h-8 w-8" src={hand} alt="" />
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <span className=" text-text_black font-[500]" >Enter Your Email  </span>
                    <img className=" h-4 w-4" src={downHand} alt="" />
                </div>
                <input type="text" name="email" className=" bg-transparent w-full text-text_black border-[2px] border-main_light_purple mt-2 rounded-md focus:outline-main_dark_violet_color p-2" placeholder="Email" onChange={handleChange}
                    value={email} />

                <button type="submit" className="w-full rounded-sm mt-4 h-12 bg-main_dark_violet_color text-white font-bold">SIGN UP</button>
                <div className=" flexflex-col gap-1 mt-4 ">
                    <span className=" text-text_black">Already have an account ? </span>
                    <Link to={"/login"} className="text-lg text-main_light_purple font-bold">Login </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;
