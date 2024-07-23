import useChatStore from "@/hooks/useChatStore";
// import useUserStore from "@/hooks/useUserStore";
import { GET_MESSAGE_ROUTE } from "@/utils/constants";
import server from "@/utils/server";
import moment from "moment";
import { useEffect, useRef } from "react";

const ChatContent = () => {
  const scrollRef = useRef();
  // const { user } = useUserStore();
  const { type, data, message, setChatMessage } = useChatStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await server.post(
          GET_MESSAGE_ROUTE,
          { id: data._id },
          { withCredentials: true }
        );
        if (response.data) {
          setChatMessage(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (data._id) {
      if (type === "contact") getMessages();
    }
  }, [data, type]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const renderMessage = () => {
    let lastDate = null;
    return message.map((item, index) => {
      const messageDate = moment(item.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate != lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className=" text-center text-gray-500 my-2">
              {moment(item.timestamp).format("LL")}
            </div>
          )}
          {type === "contact" && renderDomMessage(item)}
        </div>
      );
    });
  };

  const renderDomMessage = (item) => (
    <div className={`${item.sender === data._id ? "text-left" : "text-right"}`}>
      {item.messageType === "text" && (
        <div
          className={`${
            item.sender !== data._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {item.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(item.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="w-full md:w-[65vw] lg:w-[70vw] xl:w-[80vw] flex-1 overflow-y-auto scrollbar-hidden p-4 px-8">
      {renderMessage()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatContent;
