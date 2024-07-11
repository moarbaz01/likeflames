import { useCallback } from "react";
function useDate() {
  const handleGetDate = useCallback((data) => {
    return new Date(data).toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weeks: "weeks",
    });
  }, []);
  return { handleGetDate };
}

export default useDate;
