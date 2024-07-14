import { useContext, useEffect } from "react";
import "./App.css";
import BottomNavbar from "./components/Layout/BottomNavbar";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { SocketsContext } from "./context/useSockets";
import { PeerContext } from "./context/usePeer";

function App() {
  useContext(PeerContext);
  useAuth();
  useContext(SocketsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen  overflow-x-hidden">
      <BottomNavbar />
      <Toaster />
      <Router />
    </div>
  );
}

export default App;
