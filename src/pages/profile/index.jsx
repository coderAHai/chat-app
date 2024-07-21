import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "@/store/userSlice";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/utils/color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import server from "@/utils/server";
import {
  HOST,
  ADD_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
  DELETE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const setUser = (data) => dispatch(setUserInfo(data));
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [color, setColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user.profileSetup) {
      setUserName(user.userName);
      setColor(user.color);
    }
    if (user.image) {
      setImage(`${HOST}/${user.image}`);
    }
  }, [dispatch, user]);

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
          setUser(response.data);
          toast.success("Profile updated successfully.");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          setUser({ ...user, image: response.data.image });
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
        setUser({ ...user, image: null });
        toast.success("Image removed successfully.");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
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
          <div className="flex flex-col justify-center items-center gap-5 min-w-32 md:min-w-64 text-white">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disbaled="true"
                readOnly
                value={user.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="UserName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="flex gap-5 w-full">
              {colors.map((item, index) => (
                <div
                  key={index}
                  className={`
                    ${item}
                    ${
                      color === index
                        ? "outline outline-white/50 outline-2"
                        : ""
                    }
                    w-8 h-8 rounded-full cursor-pointer 
                  `}
                  onClick={() => setColor(index)}
                ></div>
              ))}
            </div>
          </div>
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
