import React from "react";
import Skeleton from "react-loading-skeleton";

const ImageGridSkeleton = () => {
  return (
    <div className="container mx-auto md:mt-0 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="cursor-pointer dark:drop-shadow-md relative"
              style={{ paddingTop: "100%" }} // Maintain aspect ratio (1:1 here)
            >
              <Skeleton
                className="w-full h-full object-cover rounded-lg absolute inset-0"
                style={{ borderRadius: "0.5rem" }} // Match border-radius
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGridSkeleton;
