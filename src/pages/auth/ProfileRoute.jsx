import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProfileRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  const auth = !!user;
  return auth ? children : <Navigate to="/auth" />;
};

export default ProfileRoute;
