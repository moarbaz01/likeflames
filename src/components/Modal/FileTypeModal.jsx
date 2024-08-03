import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiFileOn, CiImageOn, CiVideoOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { PiFileAudio } from "react-icons/pi";
import { motion } from "framer-motion";

const fileTypeData = [
  {
    name: "Images",
    icon: <CiImageOn className="text-2xl" />,
    accept: "image/*",
    color: "bg-red-500",
  },
  {
    name: "Videos",
    icon: <CiVideoOn className="text-2xl" />,
    accept: "video/*",
    color: "bg-green-500",
  },
  {
    name: "Docs",
    icon: <CiFileOn className="text-2xl" />,
    accept: ".pdf, .doc, .docx, .txt, .zip, .rar,",
    color: "bg-blue-500",
  },
  {
    name: "Audio",
    icon: <PiFileAudio className="text-2xl" />,
    accept: "audio/*",
    color: "bg-yellow-500",
  },
];

function FileTypeModal({ isOpen, onClose, setFiles, files = 0 }) {
  const [selected, setSelected] = useState({});
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles?.length > 4) {
      onClose();
      toast.error("You can select maximum 4 files");
      return;
    }

    if (files.length + selectedFiles.length > 4) {
      onClose();
      toast.error("You can select maximum 4 files");
      return;
    }
    setFiles([...files, ...selectedFiles]);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="flex  z-[9999] bg-black/50 backdrop-blur-sm  items-center justify-center fixed top-0 bottom-0 left-0 right-0">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-8"
      >
        {fileTypeData.map((item, index) => (
          <label
            htmlFor="file"
            key={index}
            onClick={() => setSelected(item)}
            className="flex items-center cursor-pointer flex-col gap-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${item.color} rounded-full hover:opacity-70 h-16 w-16 transition flex items-center justify-center`}
            >
              {item.icon}
            </motion.div>
            <p className="text-white">{item.name}</p>
          </label>
        ))}
      </motion.div>

      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file"
        accept={selected.accept}
        multiple
        max={4}
      />

      <div
        onClick={onClose}
        className=" absolute cursor-pointer top-4 text-4xl right-4 text-white"
      >
        <HiXMark />
      </div>
    </div>
  );
}

export default FileTypeModal;
