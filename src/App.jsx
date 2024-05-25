import { useLocation } from "react-router-dom";
import "./App.css";
import BottomNavbar from "./components/BottomNavbar";
import Router from "./routes/Router";
import CallModal from "./components/CallModal";
import avatar2 from "../src/assets/avatars/avatar2.png";
import PostModal from "./components/PostModal";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
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
  ];
  const location = useLocation();
  return (
    <div>
      {!hiddenBottomNavbar.includes(location.pathname) && <BottomNavbar />}
      <Router />
    </div>
  );
}

export default App;
