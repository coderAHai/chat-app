import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import { useSocket } from "@/context/SocketContext";

const ChatFooter = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const { type, data } = useChatStore();
  const { user } = useUserStore();
  const socket = useSocket();

  useEffect(() => {
    function handlePickerClose(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePickerClose);
    return () => {
      document.removeEventListener("mousedown", handlePickerClose);
    };
  }, [emojiRef]);

  const handleMessageSend = async () => {
    if (type === "contact" && message !== "") {
      socket.emit("sendMessage", {
        sender: user.id,
        content: message,
        recipient: data._id,
        messageType: "text",
        fileUrl: undefined,
      });
      setMessage("");
    }
  };

  const handleEmojiClick = ({ emoji }) => {
    setMessage((message) => message + emoji);
  };

  return (
    <div className="flex justify-center items-center w-full h-[10vh] bg-[#1c1d25] px-8 mb-6 gap-6">
      <div className="flex items-center gap-5 flex-1 h-full bg-[#2a2b33] rounded-md pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            onClick={() => setPickerOpen(true)}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="text-3xl mt-2" />
          </button>
          <div ref={emojiRef} className="absolute bottom-16 right-0">
            <EmojiPicker
              theme="dark"
              open={pickerOpen}
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="flex justify-center items-center bg-[#8417ff] rounded-md border-none p-5 outline-none duration-300 transition-all hover:bg-[#741bda] focus:bg-[#741bda]"
        onClick={handleMessageSend}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default ChatFooter;
