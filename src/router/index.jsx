import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import AuthRoute from "@/router/AuthRoute";
import ChatRoute from "@/router/ChatRoute";
import ProfileRoute from "@/router/ProfileRoute";

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
      <ChatRoute>
        <Chat />
      </ChatRoute>
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
