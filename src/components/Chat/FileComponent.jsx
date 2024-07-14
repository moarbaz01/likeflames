import { useCallback, useEffect, useState } from "react";
import { FiFile } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import Loader from "../Loaders/Loader";

function FileComponent({ file, index, setFiles, isLoading }) {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const handleRemoveElements = useCallback(() => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, [index, setFiles]);

  useEffect(() => {
    if (file.type.includes("image")) {
      setType("Image");
      setColor("bg-green-500");
    } else if (file.type.includes("video")) {
      setType("Video");
      setColor("bg-blue-500");
    } else if (file.type.includes("audio")) {
      setType("Audio");
      setColor("bg-red-500");
    } else if (file.type.includes("application")) {
      setType("Docs");
      setColor("bg-blue-500");
    }
  }, [file.type]);

  return (
    <div className="flex flex-col gap-2 size-24 relative justify-center ">
      <div
        className={`flex items-center flex-col relative justify-center p-2 size-20 ${color} dark:text-white gap-1 rounded-lg`}
      >
        <FiFile className="text-xl" />
        <p className="text-sm">{type}</p>
        {isLoading && (
          <div className="absolute h-full w-full flex items-center justify-center bg-black/40">
            <Loader />
          </div>
        )}
      </div>
      <p className="text-xs dark:text-white text-ellipsis whitespace-nowrap overflow-hidden">
        {file.name}
      </p>
      {!isLoading && (
        <HiXMark
          onClick={handleRemoveElements}
          className="cursor-pointer absolute -top-4 -left-4 dark:text-white"
        />
      )}
    </div>
  );
}

export default FileComponent;
