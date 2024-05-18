import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { Suspense, lazy } from "react";

const routesData = [
  {
    path: "/",
    element: lazy(() => import("../pages/Home")),
  },
  {
    path: "/profile",
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
    path: "/dob",
    element: lazy(() => import("../pages/DOB")),
  },
  {
    path: "/profile/edit",
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
    path: "/chat",
    element: lazy(() => import("../pages/Chat")),
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
  },
  {
    path: "/username",
    element: lazy(() => import("../pages/Username")),
  },
  {
    path: "/signup",
    element: lazy(() => import("../pages/Signup")),
  },
  {
    path: "/Login",
    element: lazy(() => import("../pages/Login")),
  },
  {
    path: "/otp",
    element: lazy(() => import("../pages/Otp")),
  },
];

const Router = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {routesData.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoutes children={<route.path />} />
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
