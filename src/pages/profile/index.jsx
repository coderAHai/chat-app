import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import server from "@/utils/server";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import useUserStore from "@/hooks/useUserStore";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { ProfileInfo } from "@/components/profile/ProfileInfo";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUserData } = useUserStore();
  const [userName, setUserName] = useState("");
  const [color, setColor] = useState(0);

  useEffect(() => {
    if (user.profileSetup) {
      setUserName(user.userName);
      setColor(user.color);
    }
  }, [user]);

  const validateProfile = () => {
    if (!userName) {
      toast.error("UserName is required.");
      return false;
    }
    return true;
  };

  const handleSaveClick = async () => {
    if (validateProfile()) {
      try {
        const response = await server.post(
          UPDATE_PROFILE_ROUTE,
          { userName, color },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserData(response.data);
          toast.success("Profile updated successfully.");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBackClick = () => {
    if (user.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile.");
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 w-full h-[100vh] bg-[#1b1c24]">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack
            onClick={handleBackClick}
            className="text-white/90 cursor-pointer text-4xl lg:text-6xl"
          />
        </div>
        <div className="grid grid-cols-2">
          <ProfileAvatar userName={userName} color={color} />
          <ProfileInfo
            user={user}
            userName={userName}
            color={color}
            setUserName={setUserName}
            setColor={setColor}
          />
        </div>
        <div className="w-full">
          <Button
            onClick={handleSaveClick}
            className="w-full h-16 bg-purple-700 hover:bg-purple-500 transition-all duration-300"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
