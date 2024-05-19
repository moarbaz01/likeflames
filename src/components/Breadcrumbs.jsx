import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = location.pathname.split("/").filter((e) => e !== "");

  const handleClick = (index) => {
    const to = "/" + paths.slice(0, index + 1).join("/");
    navigate(to);
  };

  return (
    <div className="flex space-x-2">
      <span
        className="cursor-pointer text-blue-600 hover:text-blue-700"
        onClick={() => navigate("/")}
      >
        <span className="text-gray-500">&gt;  </span>
        Home
      </span>
      {paths.map((path, i) => (
        <React.Fragment key={i}>
          <span className="text-gray-500">&gt;</span>
          <span
            className="cursor-pointer  text-main_dark_violet_color hover:text-blue-700"
            onClick={() => handleClick(i)}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumbs;
