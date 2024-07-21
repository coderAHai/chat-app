import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
  if (user) {
    return user.profileSetup ? children : <Navigate to="/profile" />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default PrivateRoute;
