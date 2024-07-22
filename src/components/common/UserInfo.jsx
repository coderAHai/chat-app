import useUserStore from "@/hooks/useUserStore";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/utils/color";
import { HOST } from "@/utils/constants";

const UserInfo = () => {
  const { user } = useUserStore();

  return (
    <div className="flex items-center gap-5 flex-1">
      <div className="relative w-12 h-12">
        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
          {user.image ? (
            <AvatarImage
              src={`${HOST}/${user.image}`}
              alt="profile"
              className="w-full h-full object-cover bg-black"
            />
          ) : (
            <div
              className={`flex justify-center items-center w-12 h-12 uppercase border rounded-full text-center ${getColor(
                user.color
              )}`}
            >
              {user.userName
                ? user.userName.split("").shift()
                : user.email.split("").shift()}
            </div>
          )}
        </Avatar>
      </div>
      <div>{user.userName}</div>
    </div>
  );
};

export default UserInfo;
