// SkeletonLoader.js
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../../context/useTheme";
import SkeletonThemeWrapper from "./SkeletonThemeWrapper";

const PostSkeleton = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <SkeletonThemeWrapper>
      <div className="w-full md:p-4 p-2 mb-4 relative dark:drop-shadow-xl bg-main_bg_white dark:bg-dark_secondary_bg rounded-xl">
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex cursor-pointer items-center gap-4">
            <Skeleton circle={true} height={50} width={50} />
            <div>
              <Skeleton width={100} />
              <Skeleton width={60} />
            </div>
          </div>
          <Skeleton width={20} height={20} />
        </div>
        <div className="md:p-4 m-auto">
          <Skeleton height={400}/>
        </div>
        <div className="md:hidden m-auto">
          <Skeleton height={300}/>
        </div>
        <div className="px-2 py-2 mt-4 gap-2 flex-col flex">
          <Skeleton width={200} />
          <Skeleton count={3} />
        </div>
        <div className="py-2 flex flex-col">
          <Skeleton width={100} />
        </div>
        <div className="flex gap-2 flex-wrap w-2/3 mt-4">
          <Skeleton width={60} height={20} count={3} />
        </div>
      </div>
    </SkeletonThemeWrapper>
  );
};

export default PostSkeleton;
