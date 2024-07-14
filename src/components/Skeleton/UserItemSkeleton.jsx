// UserItemSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonThemeWrapper from "./SkeletonThemeWrapper";

const UserItemSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div
        className={`flex w-full items-end cursor-pointer 
        bg-white dark:bg-dark_secondary_bg transition rounded-xl py-4 px-2 justify-between`}
      >
        <div className="flex gap-4">
          <div className="relative h-10 w-10">
            <Skeleton circle={true} height={40} width={40} />
          </div>
          <div className="flex flex-col text-black">
            <Skeleton width={80} height={16} style={{ marginBottom: 6 }} />
            <Skeleton width={60} height={14} />
          </div>
        </div>
        <div className="flex items-center">
          <Skeleton circle={true} height={12} width={12} />
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default UserItemSkeleton;
