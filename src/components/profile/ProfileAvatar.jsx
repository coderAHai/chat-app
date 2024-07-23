import { useEffect, useRef, useState } from "react";
import { getColor } from "@/utils/color";
import server from "@/utils/server";
import {
  HOST,
  ADD_PROFILE_IMAGE_ROUTE,
  DELETE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";
import useUserStore from "@/hooks/useUserStore";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaPlus, FaTrash } from "react-icons/fa";

const ProfileAvatar = ({ userName, color }) => {
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const { user, setUserData } = useUserStore();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user.image) {
      setImage(`${HOST}/${user.image}`);
    }
  }, [user]);

  const handleFileInputClick = async () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await server.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.image) {
          setUserData({ ...user, image: response.data.image });
          toast.success("Image updated successfully.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDelete = async () => {
    try {
      const response = await server.delete(DELETE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserData({ ...user, image: null });
        toast.success("Image removed successfully.");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center relative w-32 md:w-48 h-full md:h-48"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar className="w-32 md:w-48 h-32 md:h-48 rounded-full overflow-hidden">
        {image ? (
          <AvatarImage
            src={image}
            alt="profile"
            className="w-full h-full object-cover bg-black"
          />
        ) : (
          <div
            className={`flex justify-center items-center w-full h-full uppercase text-5xl border rounded-full ${getColor(
              color
            )}`}
          >
            {userName
              ? userName.split("").shift()
              : user.email.split("").shift()}
          </div>
        )}
      </Avatar>
      {hovered && (
        <div
          className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 bg-black/50 ring-fuchsia-50 rounded-full"
          onClick={image ? handleImageDelete : handleFileInputClick}
        >
          {image ? (
            <FaTrash className="text-3xl text-white cursor-pointer" />
          ) : (
            <FaPlus className="text-3xl text-white cursor-pointer" />
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        name="profile-name"
        accept=".png, .jpg, .jpeg, .svg, .webp"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileAvatar;
