import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { Suspense, lazy } from "react";
import Spinner from "../components/Spinner";

const routesData = [
  {
    path: "/",
    element: lazy(() => import("../pages/Home")),
  },
  {
    path: "/profile/:id",
    element: lazy(() => import("../pages/Profile")),
    protected: true,
  },
  {
    path: "/feed",
    element: lazy(() => import("../pages/Feed")),
  },
  {
    path: "/password",
    element: lazy(() => import("../pages/Password")),
  },
  {
    path: "/createPost",
    element: lazy(() => import("../pages/CreatePost")),
  },
  {
    path: "/edit-profile",
    element: lazy(() => import("../pages/EditProfile")),
    protected: true,
  },
  {
    path: "/post/:id",
    element: lazy(() => import("../pages/Post")),
  },
  {
    path: "/explore",
    element: lazy(() => import("../pages/Explore")),
  },
  {
    path: "/messages",
    element: lazy(() => import("../pages/Messages")),
    protected: true,
  },
  {
    path: "/notifications",
    element: lazy(() => import("../pages/Notifications")),
    protected: true,
  },
  {
    path: "/chat/:id",
    element: lazy(() => import("../pages/Chat")),
    protected: true,
  },
  {
    path: "/avatar",
    element: lazy(() => import("../pages/Avatar")),
    protected: true,
  },
  {
    path: "/username",
    element: lazy(() => import("../pages/Username")),
  },
  {
    path: "/name",
    element: lazy(() => import("../pages/Name")),
  },
  {
    path: "/signup",
    element: lazy(() => import("../pages/Signup")),
  },
  {
    path: "/login",
    element: lazy(() => import("../pages/Login")),
  },
  {
    path: "/otp",
    element: lazy(() => import("../pages/Otp")),
  },
  {
    path: "/video-call/:id",
    element: lazy(() => import("../pages/VideoCall")),
    protected: true,
  },
  {
    path: "/voice-call",
    element: lazy(() => import("../pages/VoiceCall")),
    protected: true,
  },
  {
    path: "/comments",
    element: lazy(() => import("../pages/Comments")),
  },
];

const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="flex  z-[9999] gap-12 flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0">
          <Spinner />
        </div>
      }
    >
      <Routes>
        {routesData.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoutes children={<route.element />} />
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
