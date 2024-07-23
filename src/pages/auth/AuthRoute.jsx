import useUserStore from "@/hooks/useUserStore";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useUserStore();
  if (user) {
    return user.profileSetup ? (
      <Navigate to="/chat" />
    ) : (
      <Navigate to="/profile" />
    );
  } else {
    return children;
  }
};

export default AuthRoute;
