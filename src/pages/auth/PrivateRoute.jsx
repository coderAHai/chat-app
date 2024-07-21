import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  const isAuth = !!user;
  return isAuth ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
