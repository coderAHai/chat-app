import EmptyAnimation from "@/components/animation/EmptyAnimation";
import UserInfo from "@/components/common/UserInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatStore from "@/hooks/useChatStore";
import { SEARCH_ROUTE } from "@/utils/constants";
import server from "@/utils/server";
import { useRequest } from "ahooks";
import { useState } from "react";

const ContactsDialog = ({ openDialog, setOpenDialog }) => {
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
                    onClick={() => handleSelectContact(item)}
                    className=" cursor-pointer"
                  >
                    <UserInfo user={item} />
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
  );
};

export default ContactsDialog;
