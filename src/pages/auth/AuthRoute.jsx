import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  const isAuth = !!user;
  return isAuth ? <Navigate to="/chat" /> : children;
};

export default AuthRoute;
