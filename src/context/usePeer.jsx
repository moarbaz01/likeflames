import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, createContext, useEffect, useCallback } from "react";
import useSocket from "../hooks/useSocket";
import { useSelector } from "react-redux";
import useToaster from "../hooks/useToaster";
import { toast } from "react-hot-toast";

const blankProfile =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export const PeerContext = createContext();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
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
  const [callInProgress, setCallInProgress] = useState(false); // New state for tracking call status
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
          //   facingMode: cameraMode,
        },
        audio: true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(
        updatedConstraints
      );
      localStreamRef.current = stream;
    } catch (error) {
      console.error("Error getting user media: ", error);
    }
  }, [localStreamRef.current]);

  //   Handle Set Mute Audio --------------------
  const handleSetMuteAudio = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current
        .getTracks()
        .find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMuteAudio(!muteAudio);
      }
    }
  }, [localStreamRef.current, muteAudio]);

  //   Handle Camera Mode ----------------------------
  const handleCameraMode = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current
        .getTracks()
        .find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraMode(!cameraMode);
      }
    }
  }, [localStreamRef.current, cameraMode]);

  const checkUserDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some((device) => device.kind === "videoinput");
    const hasMicrophone = devices.some(
      (device) => device.kind === "audioinput"
    );
    return { hasCamera, hasMicrophone };
  };

  //   Create Peer Connection ---------------------------
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
        socket.emit("send:candidate", {
          candidate: event.candidate,
          from: user?._id,
          to: opponentId,
        });
      }
    };

    peerConnectionRef.current.oniceconnectionstatechange =
      handleConnectionStateChange;
    peerConnectionRef.current.onconnectionstatechange =
      handleConnectionStateChange;
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
    if (!outputDevices.hasCamera) {
      toast.error("No video devices found");
      return;
    }
    if (!outputDevices.hasMicrophone) {
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
    setCallInProgress(true); // Set call in progress
    navigate(`/video-call/${id}`);
  };

  const createAnswer = useCallback(
    async (offer, opponentId) => {
      if (!user) {
        console.log("User not available yet.");
        return;
      }
      if (callInProgress) {
        console.log("A call is already in progress.");
        return;
      }

      const outputDevices = await checkUserDevices();
      if (!outputDevices.hasCamera) {
        toast.error("No video devices found");
        return;
      }
      if (!outputDevices.hasMicrophone) {
        toast.error("No audio devices found");
        return;
      }
      await createPeerConnection(opponentId);

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

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
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }

      setCallInProgress(true); // Set call in progress
      navigate(`/video-call/${opponentId}`);
    },
    [user, callInProgress]
  );

  const handleReceiveCandidates = useCallback(({ candidate }) => {
    if (peerConnectionRef.current) {
      if (peerConnectionRef.current.remoteDescription) {
        peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } else {
        iceCandidateQueue.current.push(candidate);
      }
    }
  }, []);

  const handleReceiveOffer = useCallback(
    ({ from, offer }) => {
      if (callInProgress) {
        socket.emit("sendReject:offer", { from: user._id, to: from._id }); // Reject the offer if a call is in progress
        console.log("A call is already in progress. Rejecting the new offer.");
        return;
      }
      callToaster({ from, createOffer: () => createAnswer(offer, from._id) });
      setLoading(false);
    },
    [callToaster, createAnswer, callInProgress, socket, user]
  );

  const handleReceiveAnswer = useCallback(async ({ answer }) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      setLoading(false);
    }
  }, []);

  const disableUserMedia = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
  }, []);

  const handleCloseConnection = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
      disableUserMedia();
      setCallInProgress(false); // Reset call in progress
      setConnectionState("");
      navigate(-1);
    }
  }, [disableUserMedia, navigate]);

  const handleConnectionStateChange = useCallback(() => {
    const pc = peerConnectionRef.current;
    if (pc) {
      console.log("ICE Connection State: ", pc.iceConnectionState);
      setConnectionState(pc.connectionState);

      if (
        pc.iceConnectionState === "disconnected" ||
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "closed"
      ) {
        console.log("Opponent disconnected or connection failed/closed");
        handleCloseConnection();
      }
    }
  }, [handleCloseConnection]);

  const handleReceiveRejectOffer = useCallback(
    ({ from }) => {
      handleCloseConnection();
      callToaster({
        from,
        createOffer: () => console.log("Offer rejected"),
        type: "rejectOffer",
      });
    },
    [callToaster, handleCloseConnection]
  );

  useEffect(() => {
    if (!location.pathname.startsWith("/video-call")) {
      disableUserMedia();
    }
  }, [location.pathname, disableUserMedia]);

  useEffect(() => {
    console.log("Connection State : ", connectionState);
  }, [connectionState]);

  useEffect(() => {
    if (user) {
      socket.on("receive:candidate", handleReceiveCandidates);
      socket.on("receive:offer", handleReceiveOffer);
      socket.on("receive:answer", handleReceiveAnswer);
      socket.on("receiveReject:offer", handleReceiveRejectOffer);

      return () => {
        socket.off("receive:candidate", handleReceiveCandidates);
        socket.off("receive:offer", handleReceiveOffer);
        socket.off("receive:answer", handleReceiveAnswer);
        socket.off("receiveReject:offer", handleReceiveRejectOffer);
      };
    }
  }, [
    socket,
    handleReceiveCandidates,
    handleReceiveOffer,
    handleReceiveAnswer,
    handleReceiveRejectOffer,
    user,
  ]);

  const value = {
    localStreamRef,
    remoteStreamRef,
    createOffer,
    createAnswer,
    handleSetMuteAudio,
    muteAudio,
    handleCameraMode,
    cameraMode,
    loading,
    handleSetOpponent,
    opponent,
    peerConnectionRef,
    getUserMedia,
    createPeerConnection,
    handleCloseConnection,
    callInProgress, // Expose callInProgress
  };

  return <PeerContext.Provider value={value}>{children}</PeerContext.Provider>;
}
