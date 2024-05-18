import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import { FaArrowCircleLeft } from "react-icons/fa";
import Avatar from "./pages/Avatar";
import Username from "./pages/Username";
import Password from "./pages/Password";
import DOB from "./pages/DOB";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BottomNavbar from "./components/BottomNavbar";
import Post from "./pages/Post";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile";
import Feed from "./pages/Feed";
import Router from "./routes/Router";

function App() {
  const hiddenBottomNavbar = ["/chat", "/profile/edit", "/feed"];
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/chat") {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div>
      {!hiddenBottomNavbar.includes(location.pathname) && <BottomNavbar />}
      {/* <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/otp"} element={<Otp />} />
        <Route path={"/avatar"} element={<Avatar />} />
        <Route path={"/username"} element={<Username />} />
        <Route path={"/password"} element={<Password />} />
        <Route path={"/dob"} element={<DOB />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/post"} element={<Post />} />
        <Route path={"/explore"} element={<Explore />} />
        <Route path={"/messages"} element={<Messages />} />
        <Route path={"/chat"} element={<Chat />} />
        <Route path={"/notifications"} element={<Notifications />} />
        <Route path={"/profile/edit"} element={<EditProfile />} />
        <Route path={"/feed"} element={<Feed />} />
      </Routes> */}

      <Router />
    </div>
  );
}

export default App;
