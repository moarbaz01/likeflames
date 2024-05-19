import React, { useEffect, useRef, useState } from "react";
import { IoCall, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import avatar2 from "../assets/avatars/avatar2.png";

function VoiceCall() {
  const [mute, setMute] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaError, setMediaError] = useState("");
  const voiceRef = useRef();

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !mute));
      setMute(!mute);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-200 bottom-0">
      <div className="flex items-center flex-col justify-center h-full w-full bg-main_light_purple text-white">
        <img src={avatar2} className="h-52 w-52 " alt="" />
        {/* <h1 className="text-2xl mt-4">Sameer Khan</h1> */}
        <h1 className=" text-4xl tracking-wider mt-4">2:52</h1>
        <span>{mediaError}</span>
      </div>

      {!mediaError && (
        <audio
          ref={voiceRef}
          autoPlay
          playsInline
          className="absolute object-center hidden h-full w-full bg-black"
        ></audio>
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
      </div>
    </div>
  );
}

export default VoiceCall;
