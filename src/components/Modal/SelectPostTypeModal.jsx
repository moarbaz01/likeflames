import { HiXMark } from "react-icons/hi2";
import CreatReelImage from "../../assets/createReel.png";
import CreatPostImage from "../../assets/createPost.png";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

function SelectPostTypeModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handlePostNavigate = useCallback(() => {
    navigate(`/createPost?type=post`);
    onClose();
  }, [navigate]);
  const handleReelNavigate = useCallback(() => {
    navigate(`/createPost?type=reel`);
    onClose();
  }, [navigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className={` bg-black/40 backdrop-blur-sm items-center flex justify-center z-[9999] fixed top-0 left-0 right-0 bottom-0`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-8"
      >
        <div
          onClick={handleReelNavigate}
          className="md:size-56 size-32 flex items-center cursor-pointer hover:saturate-0 transition justify-center gap-4 flex-col"
        >
          <img
            src={CreatReelImage}
            className="object-contain bg-white rounded-lg h-full"
            alt=""
          />
          <p className="text-white">Reel</p>
        </div>
        <div
          onClick={handlePostNavigate}
          className="md:size-56 size-32 flex items-center hover:saturate-0 transition cursor-pointer justify-center gap-4 flex-col  "
        >
          <img
            src={CreatPostImage}
            className="object-contain bg-white rounded-lg  h-full"
            alt=""
          />
          <p className="text-white">Post</p>
        </div>
      </div>

      <div
        onClick={onClose}
        className=" absolute cursor-pointer top-4 text-4xl right-4 text-white"
      >
        <HiXMark />
      </div>
    </div>
  );
}

export default SelectPostTypeModal;
