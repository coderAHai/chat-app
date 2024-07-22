import ChatContainer from "@/components/chat/ChatContainer";
import ContactsContainer from "@/components/chat/ContactsContainer";
import EmptyContainer from "@/components/chat/EmptyContainer";
import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { store } = useChatStore();

  useEffect(() => {
    if (!user.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="flex w-full h-screen text-white overflow-hidden">
      <ContactsContainer />
      {store.type === undefined ? <EmptyContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
