import useUserStore from "@/hooks/useUserStore";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ChatRoute = ({ children }) => {
  const { user } = useUserStore();
  if (user) {
    if (user.profileSetup) {
      return children;
    } else {
      toast("Please setup profile to continue.");
      return <Navigate to="/profile" />;
    }
  } else {
    return <Navigate to="/auth" />;
  }
};

export default ChatRoute;
