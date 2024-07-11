import React, { useCallback } from "react";
import toast from "react-hot-toast";
import BlankProfile from "../assets/blankProfile.png";
import { MdCallEnd, MdVideoCall } from "react-icons/md";
import useSocket from "./useSocket";
import { useSelector } from "react-redux";

function useToaster() {
  const { socket } = useSocket();
  const { user } = useSelector((state) => state.user);

  const handleCreateOffer = useCallback(async (id, createOffer) => {
    await createOffer();
    toast.dismiss(id);
  }, []);

  const handleRejectCall = useCallback(
    (toastId, from) => {
      const fromObject = {
        _id: user?._id,
        profilePicture: user?.profilePicture,
        name: user?.name,
      };
      socket.emit("reject:offer", { from: fromObject, to: from._id });
      toast.dismiss(toastId);
    },
    [user, socket]
  );

  const callToaster = ({ from, createOffer, type }) => {
    toast(
      (t) => (
        <div className=" flex items-center w-full justify-between ">
          <div className="flex max items-center gap-2">
            <img
              className="w-12 h-12 rounded-full"
              src={from?.profilePicture || BlankProfile}
            />
            <p className="text-sm dark:text-gray-400 text-white ">
              {from?.name}
            </p>
          </div>
          {type !== "rejectOffer" ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleCreateOffer(t.id, createOffer)}
                className="bg-green-500 px-4 py-2 rounded-lg text-white"
              >
                <MdVideoCall className=" animate-bounce " />
              </button>
              <button
                onClick={() => handleRejectCall(t.id, from)}
                className="bg-red-500 px-4 py-2 rounded-lg text-white"
              >
                <MdCallEnd />
              </button>
            </div>
          ) : (
            <div className="text-red-500 font-bold">Decline Call</div>
          )}
        </div>
      ),
      {
        style: { background: "#333", width: "300px", maxWidth: "320px" },
        duration: type === "rejectOffer" ? 5000 : Infinity,
      }
    );
  };

  return { callToaster };
}

export default useToaster;
