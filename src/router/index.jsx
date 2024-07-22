import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import AuthRoute from "@/pages/auth/AuthRoute";
import PrivateRoute from "@/pages/auth/PrivateRoute";
import ProfileRoute from "@/pages/auth/ProfileRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProfileRoute>
        <Profile />
      </ProfileRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
]);

export default router;
