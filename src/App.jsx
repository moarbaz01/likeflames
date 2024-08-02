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
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.post);
  useContext(PeerContext);
  useAuth();
  useContext(SocketsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // useEffect(() => {
  //   checkServer();
  // }, []);

  if (isLoading) {
    return (
      <LoadingModal
        isOpen={isLoading}
        message={"Please Wait..."}
      />
    );
  }

  return (
    <div className="min-h-screen  overflow-x-hidden">
      <BottomNavbar />
      <Toaster />
      <Router />
    </div>
  );
}

export default App;
