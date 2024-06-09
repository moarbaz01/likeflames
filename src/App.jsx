import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";

function App() {
  const { autoLoginHandler } = useAuth();
  const hiddenBottomNavbar = [
    "/chat",
    "/profile/edit",
    "/feed",
    "/video-call",
    "/voice-call",
    "/login",
    "/password",
    "/otp",
    "/signup",
    "/username",
    "/name",
  ];
  const location = useLocation();

  useEffect(() => {
    autoLoginHandler();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Toaster />
      {!hiddenBottomNavbar.includes(location.pathname) && <BottomNavbar />}
      <Router />
    </div>
  );
}

export default App;
