// SidebarProfileSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonThemeWrapper from "./SkeletonThemeWrapper";

const SidebarProfileSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="flex items-center cursor-pointer w-full py-2 px-4 mb-2 rounded-xl dark:shadow-lg dark:bg-dark_secondary_bg bg-main_bg_white gap-4">
        <Skeleton circle={true} height={40} width={40} />
        <div className="flex items-start flex-col">
          <Skeleton width={120} height={16} />
          <Skeleton width={100} height={12} />
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default SidebarProfileSkeleton;
