import { useContext, useEffect, useState } from "react";
import "./App.css";
import BottomNavbar from "./components/Layout/BottomNavbar";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { SocketsContext } from "./context/useSockets";
import { PeerContext } from "./context/usePeer";
import LoadingModal from "./components/Modal/LoadingModal";
import apiRequest from "./services/apiRequest";
import { CHECK_SERVER } from "./services/api";
import { useLocation } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [serverRunning, setServerRunning] = useState(false);
  const location = useLocation();

  useContext(PeerContext);
  useAuth();
  useContext(SocketsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await apiRequest({
        method: "GET",
        url: CHECK_SERVER,
      });
      setServerRunning(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LoadingModal
        isOpen={isLoading}
        message={"Starting up, please wait..."}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <BottomNavbar />
      <Toaster />
      <Router />
    </div>
  );
}

export default App;
