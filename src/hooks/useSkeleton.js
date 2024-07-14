import { useEffect, useState } from "react";

const useSkeleton = (initialLoadingState = false) => {
  const [skeletonLoading, setSkeletonLoading] = useState(initialLoadingState);

  useEffect(() => {
    setSkeletonLoading(true);
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return skeletonLoading;
};

export default useSkeleton;
