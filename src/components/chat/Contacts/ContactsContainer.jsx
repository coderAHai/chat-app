import Logo from "@/components/common/Logo";
import Title from "@/components/common/Title";
import ContactsFooter from "./ContactsFooter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ContactsDialog from "./ContactsDialog";
import server from "@/utils/server";
import { GET_CONTACTS } from "@/utils/constants";
import useChatStore from "@/hooks/useChatStore";
import UserInfo from "@/components/common/UserInfo";

const ContactsContainer = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const {
    data,
    setChatType,
    setChatData,
    setChatMessage,
    chatContacts,
    setContacts,
  } = useChatStore();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await server.get(GET_CONTACTS, {
          withCredentials: true,
        });
        if (response.data) {
          setContacts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const handleSelectContacts = (contact) => {
    if (data && data._id !== contact) {
      setChatMessage([]);
    }
    setChatType("contact");
    setChatData(contact);
  };

  return (
    <div className=" relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] h-full bg-[#1b1c24] border-r-2 border-[#2f303b]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Direct Messages" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaPlus
                  onClick={() => setOpenDialog(true)}
                  className=" text-neutral-500 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select New Contact</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-2 mt-5 max-h-[38vh] overflow-y-auto scrollbar-hidden">
          {chatContacts.map((item) => {
            return (
              <div
                key={item._id}
                className={`px-10 py-2 ${
                  data && data._id === item._id
                    ? " bg-purple-500 cursor-default"
                    : "cursor-pointer"
                }`}
                onClick={() => handleSelectContacts(item)}
              >
                <UserInfo user={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ContactsFooter />
      <ContactsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default ContactsContainer;
