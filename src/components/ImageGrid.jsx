import React, { useCallback, useMemo } from "react";
import reel2 from "../assets/reel2.mp4";
import reel1 from "../assets/reel1.mp4";
import { useNavigate } from "react-router-dom";

const ImageGrid = () => {
  const navigate = useNavigate();
  const images = [
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      type: "image",
      content: "post",
    },
    {
      src: reel2,
      type: "video",
      content: "post",
    },
    {
      src: reel1,
      type: "video",
      content: "reel",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      type: "image",
      content: "post",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      type: "image",
      content: "post",
    },
  ];

  const handleVideoNavigate = (content) => {
    if (content === "reel") {
      navigate("/feed");
    } else {
      navigate("/post/33");
    }
  };

  // Function to chunk array into sub-arrays of a specific size
  const chunkArray = useCallback((array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }, []);

  const chunkedImages = useMemo(
    () => chunkArray(images, 3),
    [images, chunkArray]
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-4">
      {chunkedImages.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="grid gap-4">
          {chunk.map((file, index) => (
            <div className="cursor-pointer" key={index}>
              {file.type === "video" ? (
                <video
                  onClick={() => handleVideoNavigate(file.content)}
                  src={file.src}
                  className="h-auto rounded-lg"
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img
                  onClick={() => navigate("/post")}
                  className="h-auto max-w-full rounded-lg"
                  src={file.src}
                  alt={`Gallery image ${chunkIndex * chunk.length + index + 1}`} // Fixed index calculation
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
