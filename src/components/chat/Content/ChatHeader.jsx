import useChatStore from "@/hooks/useChatStore";
import { RiCloseFill } from "react-icons/ri";
import UserInfo from "@/components/common/UserInfo";
import ChannelInfo from "@/components/common/ChannelInfo";

const ChatHeader = () => {
  const { type, data, setChatClose } = useChatStore();

  return (
    <div className="flex items-center w-full py-4 px-8 border-b-2 border-[#2f303b]">
      <div className="flex justify-between items-center gap-5 w-full">
        {type === "contact" ? (
          <UserInfo user={data} />
        ) : (
          <ChannelInfo channel={data} />
        )}
        <div className="flex justify-center items-center gap-5">
          <button
            className=" text-neutral-500 border-none outline-none hover:text-white duration-300 transition-all"
            onClick={setChatClose}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
