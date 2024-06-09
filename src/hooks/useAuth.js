import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/slicers/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

function useAuth() {
  const token = localStorage.getItem("likeflame-token");
  const isUser = useSelector((state) => state.user.isUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const autoLoginHandler = () => {
    if (token) {
      dispatch(fetchUser());
    }
  };

  return { autoLoginHandler };
}

export default useAuth;
