import { useEffect } from "react";
import Spinner from "./Spinner";

function LoadingModal({ isOpen, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="flex  z-[9999] bg-black/20 backdrop-blur-sm gap-12  flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      <Spinner />
      <div className="text-white">{message}...</div>
    </div>
  );
}

export default LoadingModal;
