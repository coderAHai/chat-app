import useUserStore from "@/hooks/useUserStore";
import { Navigate } from "react-router-dom";

const ChatRoute = ({ children }) => {
  const { user } = useUserStore();
  if (user) {
    return user.profileSetup ? children : <Navigate to="/profile" />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default ChatRoute;
