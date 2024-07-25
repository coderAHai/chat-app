import useChatStore from "@/hooks/useChatStore";
import useUserStore from "@/hooks/useUserStore";
import { getColor } from "@/utils/color";
import {
  HOST,
  GET_MESSAGE_ROUTE,
  GET_CHANNEL_MESSAGE,
} from "@/utils/constants";
import server from "@/utils/server";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdFolderZip } from "react-icons/md";

const ChatContent = () => {
  const scrollRef = useRef();
  const { user } = useUserStore();
  const { type, data, message, setChatMessage } = useChatStore();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const changeImageDialog = (show, path) => {
    setShowImage(show);
    setImageUrl(path);
  };

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

    const getChannelMessage = async () => {
      try {
        const response = await server.get(
          `${GET_CHANNEL_MESSAGE}/${data._id}`,
          { withCredentials: true }
        );
        if (response.data) {
          setChatMessage(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (data._id) {
      if (type === "contact") getMessages();
      if (type === "channel") getChannelMessage();
    }
  }, [data, type]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const checkImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (path) => {
    const response = await server.get(`${HOST}/${path}`, {
      responseType: "blob",
    });
    const fileBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = fileBlob;
    link.setAttribute("download", path.split("/").pop());
    document.body.append(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileBlob);
  };

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
          {type === "channel" && renderChannelMessage(item)}
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
      {item.messageType === "file" && (
        <div
          className={`${
            item.sender !== data._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkImage(item.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => changeImageDialog(true, item.fileUrl)}
            >
              <img src={`${HOST}/${item.fileUrl}`} width={200} height={200} />
            </div>
          ) : (
            <div
              className="flex justify-center items-center gap-4 cursor-pointer"
              onClick={() => downloadFile(item.fileUrl)}
            >
              <span className="text-white text-2xl bg-black/20 rounded-full p-4">
                <MdFolderZip />
              </span>
              <span className="line-clamp-1">
                {item.fileUrl.split("/").pop()}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(item.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderChannelMessage = (item) => {
    return (
      <div
        className={`mt-5 ${
          item.sender._id !== user.id ? "text-left" : "text-right"
        }`}
      >
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
        {item.messageType === "file" && (
          <div
            className={`${
              item.sender._id !== data._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-white/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkImage(item.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => changeImageDialog(true, item.fileUrl)}
              >
                <img src={`${HOST}/${item.fileUrl}`} width={200} height={200} />
              </div>
            ) : (
              <div
                className="flex justify-center items-center gap-4 cursor-pointer"
                onClick={() => downloadFile(item.fileUrl)}
              >
                <span className="text-white text-2xl bg-black/20 rounded-full p-4">
                  <MdFolderZip />
                </span>
                <span className="line-clamp-1">
                  {item.fileUrl.split("/").pop()}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {item.sender._id === user.id ? (
            <span>{moment(item.timestamp).format("LT")}</span>
          ) : (
            <div className="flex items-center gap-2">
              {item.sender.image ? (
                <img
                  className="w-6 h-6 rounded-full"
                  src={`${HOST}/${item.sender.image}`}
                />
              ) : (
                <div
                  className={`flex justify-center items-center w-6 h-6 uppercase border rounded-full text-center ${getColor(
                    item.sender.color
                  )}`}
                >
                  {item.sender.userName
                    ? item.sender.userName.split("").shift()
                    : item.sender.email.split("").shift()}
                </div>
              )}
              <div>{item.sender.userName}</div>
              {moment(item.timestamp).format("LT")}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full md:w-[65vw] lg:w-[70vw] xl:w-[80vw] flex-1 overflow-y-auto scrollbar-hidden p-4 px-8">
      {renderMessage()}
      <div ref={scrollRef}></div>
      {showImage && (
        <div className="fixed z-[60] top-0 left-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center backdrop-blur-lg">
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              className="w-full h-[80vh] object-cover"
            />
          </div>
          <div className="flex gap-5 mt-6">
            <button
              onClick={() => downloadFile(imageUrl)}
              className="flex justify-center items-center bg-black/20 w-12 h-12 text-3xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoMdArrowRoundDown />
            </button>
            <button
              onClick={() => changeImageDialog(false, null)}
              className="flex justify-center items-center bg-black/20 w-12 h-12 text-3xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
