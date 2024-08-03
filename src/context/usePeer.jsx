import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, createContext, useEffect, useCallback } from "react";
import useSocket from "../hooks/useSocket";
import { useSelector } from "react-redux";
import useToaster from "../hooks/useToaster";
import { toast } from "react-hot-toast";

const blankProfile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export const PeerContext = createContext();

const servers = {
  iceServers: [
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    {
      urls: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
      credential: "muazkh"
    }
  ]
};

export function PeerContextProvider({ children }) {
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [muteAudio, setMuteAudio] = useState(true);
  const [cameraMode, setCameraMode] = useState("user");
  const { socket } = useSocket();
  const [opponent, setOpponent] = useState("");
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const iceCandidateQueue = useRef([]);
  const { callToaster } = useToaster();
  const [loading, setLoading] = useState(true);
  const [callInProgress, setCallInProgress] = useState(false);
  const location = useLocation();
  const [connectionState, setConnectionState] = useState("");

  const handleSetOpponent = (id) => {
    setOpponent(id);
  };

  const getUserMedia = useCallback(async () => {
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const updatedConstraints = {
        video: {
          width: { min: 640, ideal: 1920, max: 1920 },
          height: { min: 480, ideal: 1080, max: 1080 },
        },
        audio: true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(updatedConstraints);
      localStreamRef.current = stream;
    } catch (error) {
      console.error("Error getting user media: ", error);
    }
  }, []);

  const handleSetMuteAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getTracks().find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMuteAudio(!muteAudio);
      }
    }
  }, [muteAudio]);

  const handleCameraMode = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getTracks().find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraMode(!cameraMode);
      }
    }
  }, [cameraMode]);

  const checkUserDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasVideoDevices = devices.some((device) => device.kind === "videoinput");
    const hasAudioDevices = devices.some((device) => device.kind === "audioinput");
    return { hasVideoDevices, hasAudioDevices };
  };

  const createPeerConnection = async (opponentId) => {
    peerConnectionRef.current = new RTCPeerConnection(servers);

    if (!localStreamRef.current) {
      await getUserMedia();
    }

    localStreamRef.current.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, localStreamRef.current);
    });

    remoteStreamRef.current = new MediaStream();

    peerConnectionRef.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current.addTrack(track);
      });
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("New ICE candidate: ", event.candidate);
        socket.emit("send:candidate", {
          candidate: event.candidate,
          from: user?._id,
          to: opponentId,
        });
      }
    };

    peerConnectionRef.current.oniceconnectionstatechange = () => {
      console.log("ICE Connection State Change: ", peerConnectionRef.current.iceConnectionState);
      if (peerConnectionRef.current.iceConnectionState === "disconnected" ||
        peerConnectionRef.current.iceConnectionState === "failed" ||
        peerConnectionRef.current.iceConnectionState === "closed") {
        console.log("Connection state indicates a problem. Closing connection.");
        handleCloseConnection();
      }
    };

    peerConnectionRef.current.onconnectionstatechange = () => {
      console.log("Connection State Change: ", peerConnectionRef.current.connectionState);
      setConnectionState(peerConnectionRef.current.connectionState);
    };
  };

  const createOffer = async (id) => {
    if (!user) {
      console.log("User not available yet.");
      return;
    }
    if (callInProgress) {
      console.log("A call is already in progress.");
      return;
    }
    const outputDevices = await checkUserDevices();
    if (!outputDevices.hasVideoDevices) {
      toast.error("No video devices found");
      return;
    }
    if (!outputDevices.hasAudioDevices) {
      toast.error("No audio devices found");
      return;
    }

    if (!window.confirm("Do you want to start a call?")) return;

    await getUserMedia();
    await createPeerConnection(id);

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    socket.emit("send:offer", {
      offer,
      from: {
        _id: user._id,
        profilePicture: user.profilePicture || blankProfile,
        name: user.name,
      },
      to: id,
    });

    setOpponent(id);
    setCallInProgress(true);
    navigate(`/video-call/${id}`);
  };

  const createAnswer = useCallback(async (offer, opponentId) => {
    if (!user) {
      console.log("User not available yet.");
      return;
    }
    if (callInProgress) {
      console.log("A call is already in progress.");
      return;
    }
    const outputDevices = await checkUserDevices();
    if (!outputDevices.hasVideoDevices) {
      toast.error("No video devices found");
      return;
    }
    if (!outputDevices.hasAudioDevices) {
      toast.error("No audio devices found");
      return;
    }
    await createPeerConnection(opponentId);

    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);

    socket.emit("send:answer", {
      answer,
      from: {
        _id: user._id,
        profilePicture: user.profilePicture || blankProfile,
        name: user.name,
      },
      to: opponentId,
    });

    while (iceCandidateQueue.current.length > 0) {
      const candidate = iceCandidateQueue.current.shift();
      console.log("Adding queued ICE candidate: ", candidate);
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }

    setCallInProgress(true);
    navigate(`/video-call/${opponentId}`);
  }, [user, callInProgress]);

  const handleReceiveCandidates = useCallback(({ candidate }) => {
    if (peerConnectionRef.current) {
      if (peerConnectionRef.current.remoteDescription) {
        console.log("Adding ICE candidate: ", candidate);
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        console.log("Queuing ICE candidate: ", candidate);
        iceCandidateQueue.current.push(candidate);
      }
    }
  }, []);

  const handleReceiveOffer = useCallback(({ from, offer }) => {
    if (callInProgress)
      return;
    }
    if (!window.confirm(`${from.name} is calling you. Do you want to answer?`)) {
      return;
    }
    setOpponent(from._id);
    createAnswer(offer, from._id);
  }, [callInProgress, createAnswer]);

  const handleReceiveAnswer = useCallback(async ({ answer }) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }, []);

  const handleCloseConnection = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current = null;
    }
    setCallInProgress(false);
    setOpponent("");
    navigate("/");
  };

  useEffect(() => {
    socket.on("receive:offer", handleReceiveOffer);
    socket.on("receive:answer", handleReceiveAnswer);
    socket.on("receive:candidate", handleReceiveCandidates);
    socket.on("call:end", handleCloseConnection);

    return () => {
      socket.off("receive:offer", handleReceiveOffer);
      socket.off("receive:answer", handleReceiveAnswer);
      socket.off("receive:candidate", handleReceiveCandidates);
      socket.off("call:end", handleCloseConnection);
    };
  }, [handleReceiveOffer, handleReceiveAnswer, handleReceiveCandidates]);

  return (
    <PeerContext.Provider
      value={{
        localStreamRef,
        remoteStreamRef,
        callInProgress,
        handleSetMuteAudio,
        muteAudio,
        handleCameraMode,
        cameraMode,
        createOffer,
        handleSetOpponent,
        loading,
        setLoading,
        handleCloseConnection,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}
