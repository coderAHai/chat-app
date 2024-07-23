import { HOST } from "@/utils/constants";
import { getColor } from "@/utils/color";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserInfo = ({ user }) => {
  return (
    <div className="flex items-center w-full gap-3">
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
      <div>
        <p>{user.userName}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
