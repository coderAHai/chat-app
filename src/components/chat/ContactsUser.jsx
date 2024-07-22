import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import EmptyAnimation from "../animation/EmptyAnimation";
import server from "@/utils/server";
import { SEARCH_ROUTE } from "@/utils/constants";
import { useRequest } from "ahooks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/utils/color";
import useChatStore from "@/hooks/useChatStore";

const ContactsUser = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const { setChatType, setChatData } = useChatStore();

  const { run: searchContacts } = useRequest(
    async (search) => {
      try {
        if (search.length > 0) {
          const { data } = await server.post(
            SEARCH_ROUTE,
            { search },
            { withCredentials: true }
          );
          setContacts(data);
        } else {
          setContacts([]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    {
      debounceWait: 1000,
      manual: true,
    }
  );

  const handleSelectContact = (contact) => {
    setChatType("contact");
    setChatData(contact);
    setOpenDialog(false);
    setContacts([]);
  };

  return (
    <>
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col bg-[#181920] border-none text-white w-[400px] h-[400px]">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
            {contacts.length > 0 && (
              <ScrollArea className="w-full h-[250px] mt-4">
                <div className="flex flex-col gap-4">
                  {contacts.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 items-center cursor-pointer"
                      onClick={() => handleSelectContact(item)}
                    >
                      <div className="relative w-12 h-12">
                        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                          {item.image ? (
                            <AvatarImage
                              src={`${HOST}/${item.image}`}
                              alt="profile"
                              className="w-full h-full object-cover bg-black"
                            />
                          ) : (
                            <div
                              className={`flex justify-center items-center w-12 h-12 uppercase border rounded-full text-center ${getColor(
                                item.color
                              )}`}
                            >
                              {item.userName
                                ? item.userName.split("").shift()
                                : item.email.split("").shift()}
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div>
                        <p>{item.userName}</p>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            {contacts.length <= 0 && (
              <div className="flex flex-col items-center text-white text-opacity-80 flex-1 mt-6 gap-4">
                <EmptyAnimation width={200} height={200} />
                <p className="flex gap-1">
                  <span>Hi</span>
                  <span className="text-purple-500">!</span>
                  <span>Search new</span>
                  <span className="text-purple-500">Contact.</span>
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactsUser;
