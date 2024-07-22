import useChatStore from "@/hooks/useChatStore";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/utils/color";

const ChatHeader = () => {
  const { store, closeChat } = useChatStore();
  const { data } = store;

  return (
    <div className="flex items-center w-full py-4 px-8 border-b-2 border-[#2f303b]">
      <div className="flex justify-between items-center gap-5 w-full">
        <div className="flex justify-center items-center gap-3">
          <div className="relative w-12 h-12">
            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
              {data.image ? (
                <AvatarImage
                  src={`${HOST}/${data.image}`}
                  alt="profile"
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`flex justify-center items-center w-12 h-12 uppercase border rounded-full text-center ${getColor(
                    data.color
                  )}`}
                >
                  {data.userName
                    ? data.userName.split("").shift()
                    : data.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            <p>{data.userName}</p>
            <p>{data.email}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button
            className=" text-neutral-500 border-none outline-none hover:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
