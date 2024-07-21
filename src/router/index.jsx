import { createBrowserRouter, Navigate } from 'react-router-dom'
import Auth from "@/pages/auth"
import Chat from "@/pages/chat"
import Profile from "@/pages/profile"

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth/>
  },
  {
    path: '/chat',
    element: <Chat/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: "*",
    element: <Navigate to="/auth" />
  }
])

export default router