import { useContext, useEffect, useRef, useState } from "react";
import { BiSolidCamera, BiSolidCameraOff } from "react-icons/bi";
import { IoCall, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import { PeerContext } from "../context/usePeer";
import LoadingModal from "../components/Modal/LoadingModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function VideoCall() {
  const {
    localStreamRef,
    remoteStreamRef,
    handleCameraMode,
    handleSetMuteAudio,
    cameraMode,
    muteAudio,
    loading,
    handleCloseConnection,
  } = useContext(PeerContext);
  const { connectedUsers } = useSelector((state) => state.connectedUsers);
  const { id } = useParams();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localStreamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [localStreamRef]);

  useEffect(() => {
    if (remoteStreamRef.current && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }, [remoteStreamRef]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-red-200">
      <div className="absolute top-5 left-5 bg-white h-[180px] w-[120px] md:h-1/3 md:w-1/4 rounded-xl z-50">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover rounded-lg"
        ></video>
      </div>

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 right-0 bottom-0 bg-black text-white object-cover w-full h-full "
      ></video>

      {loading && (
        <span className="flex items-center justify-center text-white fixed top-0 left-0 right-0 bottom-0">
          {" "}
          {connectedUsers[id] ? "Ringing..." : "Calling.."}
        </span>
      )}

      <div className="flex absolute bottom-20 w-full justify-center gap-6">
        <button
          className="flex flex-col items-center gap-2 p-4 text-white bg-red-500 rounded-full hover:bg-red-400 transition"
          onClick={handleSetMuteAudio}
        >
          {!muteAudio ? (
            <IoVolumeMute className="text-2xl" />
          ) : (
            <IoVolumeHigh className="text-2xl" />
          )}
        </button>
        <button
          onClick={handleCloseConnection}
          className="flex flex-col items-center gap-2 p-4 text-white bg-red-500 rounded-full hover:bg-red-400 transition"
        >
          <IoCall className="text-2xl" />
        </button>
        <button
          className="flex flex-col items-center gap-2 p-4 text-white bg-red-500 rounded-full hover:bg-red-400 transition"
          onClick={handleCameraMode}
        >
          {cameraMode === "user" ? (
            <BiSolidCamera className="text-2xl" />
          ) : (
            <BiSolidCameraOff className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
