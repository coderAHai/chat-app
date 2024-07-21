import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user.value);
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
