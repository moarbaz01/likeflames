import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import BottomNavbar from "./components/Layout/BottomNavbar";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { SocketsContext } from "./context/useSockets";
import { PeerContext } from "./context/usePeer";
import LoadingModal from "./components/Modal/LoadingModal";
import { useSelector } from "react-redux";
import { checkServer } from "./redux/slicers/loading";

function App() {
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useContext(PeerContext);
  useAuth();
  useContext(SocketsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(checkServer());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingModal isOpen={isLoading} message={"Please Wait..."} />;
  }

  return (
    <div className="md:min-h-screen overflow-x-hidden">
      <BottomNavbar />
      <Toaster />
      <Router />
    </div>
  );
}

export default App;
