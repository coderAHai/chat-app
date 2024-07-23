import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";

const ChatContainer = () => {
  return (
    <div className="flex flex-col md:flex-1 fixed md:static top-0 w-screen h-screen bg-[#1c1d25]">
      <ChatHeader />
      <ChatContent />
      <ChatFooter />
    </div>
  );
};

export default ChatContainer;
