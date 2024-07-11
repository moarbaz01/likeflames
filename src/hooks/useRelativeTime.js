import { useState, useEffect } from "react";

/**
 * Custom hook to format a date into a relative time string like Instagram.
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted relative time string.
 */
function useRelativeTime(date) {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const formatRelativeTime = () => {
      const now = new Date();
      const differenceInMs = now - date;

      const millisecondsInMinute = 60 * 1000;
      const millisecondsInHour = 60 * millisecondsInMinute;
      const millisecondsInDay = 24 * millisecondsInHour;
      const millisecondsInWeek = 7 * millisecondsInDay;

      if (differenceInMs < millisecondsInMinute) {
        return "Just now";
      } else if (differenceInMs < millisecondsInHour) {
        const minutes = Math.floor(differenceInMs / millisecondsInMinute);
        return `${minutes}m ago`;
      } else if (differenceInMs < millisecondsInDay) {
        const hours = Math.floor(differenceInMs / millisecondsInHour);
        return `${hours}h ago`;
      } else if (differenceInMs < millisecondsInWeek) {
        const days = Math.floor(differenceInMs / millisecondsInDay);
        return `${days}d ago`;
      } else {
        const weeks = Math.floor(differenceInMs / millisecondsInWeek);
        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
      }
    };

    setRelativeTime(formatRelativeTime());

    // Optionally, update the relative time every minute
    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime());
    }, 60000); // Update every minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [date]);

  return relativeTime;
}

export default useRelativeTime;
