import ChatContainer from "@/components/chat/Content/ChatContainer";
import ContactsContainer from "@/components/chat/Contacts/ContactsContainer";
import EmptyContainer from "@/components/chat/EmptyContainer";
import useChatStore from "@/hooks/useChatStore";

const Chat = () => {
  const { type } = useChatStore();

  return (
    <div className="flex w-full h-screen text-white overflow-hidden">
      <ContactsContainer />
      {type === null ? <EmptyContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
