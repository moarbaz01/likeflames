import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonThemeWrapper from "./SkeletonThemeWrapper";

const FeedItemSkeleton = () => {
  return (
    <SkeletonThemeWrapper>
      <div className="h-full w-full md:w-[420px] md:min-w-[320px] snap-start bg-white dark:bg-dark_secondary_bg overflow-hidden relative">
        {/* Video Skeleton */}
        <div className="relative h-full w-full">
          {/* <div className="skeleton-video">
            <Skeleton height={"100%"} />
          </div> */}
          {/* Bottom Section */}
          <div className="absolute bg-white/40 bottom-0 left-0 right-0 px-2 py-3 text-white">
            {/* Author Section */}
            <div className="flex items-center cursor-pointer">
              <div className="skeleton-avatar">
                <Skeleton circle={true} height={48} width={48} />
              </div>
              <div className="ml-4">
                <Skeleton width={120} />
                <Skeleton width={80} />
              </div>
            </div>
            {/* Description */}
            <Skeleton count={2} height={16} />
          </div>
          {/* Right Icons */}
          <div className="absolute top-[50%] right-2 transform -translate-y-1/2">
            <div className="skeleton-icon">
              <Skeleton circle={true} height={40} width={40} />
              <Skeleton width={30} />
            </div>
            <div className="skeleton-icon mt-4">
              <Skeleton circle={true} height={40} width={40} />
              <Skeleton width={30} />
            </div>
            <div className="skeleton-icon mt-4">
              <Skeleton circle={true} height={40} width={40} />
              <Skeleton width={30} />
            </div>
          </div>
          {/* Play Button */}
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="skeleton-play-button">
              <Skeleton circle={true} height={60} width={60} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default FeedItemSkeleton;
