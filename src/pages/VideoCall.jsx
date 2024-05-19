import React, { useEffect, useRef, useState } from "react";
import { BiSolidCamera, BiSolidCameraOff } from "react-icons/bi";
import { IoCall, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

function VideoCall() {
  const [mute, setMute] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [stream, setStream] = useState(null);
  const [mediaError, setMediaError] = useState(null);
  const [videoPosition, setVideoPosition] = useState("top-left");
  const videoRef = useRef();

  const setYourVideo = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideo = devices.some((device) => device.kind === "videoinput");
      const hasAudio = devices.some((device) => device.kind === "audioinput");

      if (hasVideo || hasAudio) {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: hasVideo,
          audio: hasAudio,
        });
        videoRef.current.srcObject = userStream;
        setStream(userStream);
        setMediaError(null); // Clear any previous errors
      } else {
        setMediaError("No media devices found.");
      }
    } catch (error) {
      setMediaError("Error accessing media devices.");
      console.error("Error accessing media devices.", error);
    }
  };

  useEffect(() => {
    setYourVideo();
  }, []);

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !mute));
      setMute(!mute);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !cameraEnabled));
      setCameraEnabled(!cameraEnabled);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-200 bottom-0">
      <div className="bg-white h-[180px] w-[120px] md:h-1/3 md:w-1/4 absolute rounded-xl z-[50] top-5 left-5"></div>

      {mediaError ? (
        <div className="flex items-center justify-center h-full w-full bg-black text-white">
          {mediaError}
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute object-center h-full w-full bg-black"
        ></video>
      )}
      <div className="flex absolute items-center bottom-20 w-full justify-center gap-6">
        <button
          className="flex bg-red-500 flex-col cursor-pointer hover:bg-red-400 transition items-center gap-2 text-white p-4 rounded-full"
          onClick={toggleMute}
          disabled={!stream}
        >
          {mute ? (
            <IoVolumeMute className="text-2xl" />
          ) : (
            <IoVolumeHigh className="text-2xl" />
          )}
        </button>
        <button className="flex bg-red-500 hover:bg-red-400  cursor-pointer transition flex-col items-center gap-2 text-white p-4 rounded-full">
          <IoCall className="text-2xl" />
        </button>
        <button
          className="flex bg-red-500 flex-col hover:bg-red-400  cursor-pointer transition items-center gap-2 text-white p-4 rounded-full"
          onClick={toggleCamera}
          disabled={!stream}
        >
          {cameraEnabled ? (
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
