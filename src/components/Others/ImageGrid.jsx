import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetFileType from "../../hooks/useGetFileType";

const ImageGrid = ({ data }) => {
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { getFileType } = useGetFileType();

  const handleVideoNavigate = ({ type, _id }) => {
    if (type === "reel") {
      navigate(`/feed?id=${_id}`);
    } else {
      navigate(`/post/${_id}`);
    }
  };

  return (
    <div className="container mx-auto md:mt-0 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(data ? data : posts).map((file, index) => (
          <div className="cursor-pointer dark:drop-shadow-md" key={index}>
            {file.postType === "reel" ? (
              <video
                onClick={() =>
                  handleVideoNavigate({ type: file.postType, _id: file._id })
                }
                src={file.files[0]}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
              />
            ) : getFileType(file.files[0]) === "image" ? (
              <img
                onClick={() => navigate(`/post/${file._id}`)}
                className="w-full h-full object-cover rounded-lg"
                src={file.files[0]}
                alt={file._id} // Added alt text for accessibility
              />
            ) : (
              <video
                onClick={() =>
                  handleVideoNavigate({ type: file.postType, _id: file._id })
                }
                src={file.files[0]}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
