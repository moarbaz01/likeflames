// SkeletonThemeWrapper.js
import React, { useContext } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../../context/useTheme";

const SkeletonThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const baseColor = theme === 'dark' ? '#303030' : '#e0e0e0';
  const highlightColor = theme === 'dark' ? '#505050' : '#f5f5f5';

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {children}
    </SkeletonTheme>
  );
};

export default SkeletonThemeWrapper;
