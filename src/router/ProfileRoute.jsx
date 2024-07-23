import useUserStore from "@/hooks/useUserStore";
import { Navigate } from "react-router-dom";

const ProfileRoute = ({ children }) => {
  const { user } = useUserStore();
  const auth = !!user;
  return auth ? children : <Navigate to="/auth" />;
};

export default ProfileRoute;
