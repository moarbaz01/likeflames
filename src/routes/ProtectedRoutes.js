import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("likeflame-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
  }, [user, navigate, token]);

  if (!user && !token) {
    return null;
  }

  return children;
};

export default ProtectedRoutes;
