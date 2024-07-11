import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserInfoSection = ({ currentUser }) => {
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    return (
        currentUser?.bio && (
            <div className="flex flex-col bg-white dark:bg-dark_secondary_bg mt-4 px-4 py-4 overflow-x-hidden rounded-xl w-full">
                <h1 className="text-gray-400 font-[500] text-xl">
                    {user?._id === id && "Your"} Bio
                </h1>
                <p className="mt-4 whitespace-pre-wrap text-gray-400 font-normal">
                    {currentUser?.bio}
                </p>
            </div>
        )
    );
};

export default UserInfoSection;
