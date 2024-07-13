import React, { createContext, useCallback, useState, useEffect } from "react";
import { FETCH_USER } from "../services/api";
import apiRequest from "../services/apiRequest";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast"; // Assuming you use react-toastify for notifications

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Fetch Current User
  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      console.log(id)
      const res = await apiRequest({
        method: "get",
        url: `${FETCH_USER}/${id}`,
      });
      setCurrentUser((state) => ({ ...state, ...res.data.user }));
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCurrentUser();
    }
  }, [id, fetchCurrentUser]);

  //   Values
  const value = {
    fetchCurrentUser,
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
