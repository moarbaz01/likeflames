import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slicers/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCallback } from "react";

const TopSection = ({ currentUser }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle Logout
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate("/login")
        toast.success("Logout");
    }, [dispatch, navigate])

    return (
        <div className="dark:bg-dark_secondary_bg bg-white px-2 py-2 flex items-center justify-between rounded-xl w-full">
            <div className="flex flex-col ">
                <h1 className="text-main_dark_violet_color dark:text-main_light_purple font-[500] text-2xl">
                    {currentUser?.name}
                </h1>
                <p className="text-gray-400 dark:text-white font-[500] text-sm m-0">
                    @{currentUser?.username}
                </p>
            </div>
            {user?._id === currentUser?._id && <div onClick={handleLogout} className="dark:text-white hover:opacity-80 transition cursor-pointer  text-3xl pr-4">
                <CiLogout />
            </div>}
        </div>
    )
}

export default TopSection