import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import store from "@/store/index";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { user } = useUserStore();
  const { addChatMessage, addChatContacts, addChatChannels } = useChatStore();

  useEffect(() => {
    if (user) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: user.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });

      const handleRecieveMessage = async (message) => {
        const { data, type, chatContacts } = store.getState().chat;
        if (
          type !== null &&
          (data._id === message.sender._id ||
            data._id === message.recipient._id)
        ) {
          addChatMessage(message);
          const isExist = chatContacts.some(
            (item) => item._id === message.recipient._id
          );
          if (!isExist) {
            addChatContacts(message.recipient);
          }
        }
      };

      const handleRecieveChannelMessage = async (message) => {
        const { data, type, channels } = store.getState().chat;
        if (type !== null && data._id === message.channel._id) {
          addChatMessage(message);
          const isExist = channels.some(
            (item) => item._id === message.channel._id
          );
          if (!isExist) {
            addChatChannels(message.recipient);
          }
        }
      };

      socket.current.on("recieveMessage", handleRecieveMessage);
      socket.current.on("recieveChannelMessage", handleRecieveChannelMessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
