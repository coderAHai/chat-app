import UserInfo from "@/components/common/UserInfo";
import { FiEdit2 } from "react-icons/fi";
import { IoIosPower } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/hooks/useUserStore";
import server from "@/utils/server";
import { LOGOUT_ROUTE } from "@/utils/constants";

const ContactsFooter = () => {
  const navigate = useNavigate();
  const { user, setUserData } = useUserStore();

  const handleLogoutClick = async () => {
    try {
      const response = await server.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center absolute bottom-0 w-full h-16 px-4 bg-[#212b33]">
      <div className="flex justify-between items-center gap-3 w-full">
        <UserInfo user={user} />
        <div className="flex gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2
                  className="text-purple-500 text-xl font-medium"
                  onClick={() => navigate("/profile")}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosPower
                  className="text-purple-500 text-2xl font-medium"
                  onClick={handleLogoutClick}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ContactsFooter;
