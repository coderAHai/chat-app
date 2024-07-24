import UserInfo from "@/components/common/UserInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { CREATE_CHANNEL, SEARCH_ROUTE } from "@/utils/constants";
import server from "@/utils/server";
import { useRequest } from "ahooks";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RiCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useChatStore from "@/hooks/useChatStore";

const ChannelDialog = ({ openChannelDialog, setOpenChannelDialog }) => {
  const searchRef = useRef(null);
  const [channelName, setChannelName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [members, setMenbers] = useState([]);
  const { addChatChannels } = useChatStore();

  const handleAddMember = (menber) => {
    const isExist = members.some((item) => item._id === menber._id);
    if (isExist) {
      toast("用户已添加至频道");
    } else {
      setMenbers([...members, menber]);
      toast("添加用户成功");
    }
  };

  const handleDeleteMember = (menber) => {
    const data = members.filter((item) => item._id !== menber._id);
    setMenbers(data);
  };

  const closeSearch = () => {
    searchRef.current.value = "";
    setContacts([]);
  };

  const handleCreateChannel = async () => {
    try {
      if (channelName.length > 0 && members.length > 0) {
        const memberList = members.map((item) => item._id);
        const response = await server.post(
          CREATE_CHANNEL,
          {
            name: channelName,
            members: memberList,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          setOpenChannelDialog(false);
          addChatChannels(response.data.channel);
          toast.success("创建频道成功.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    return () => {
      setChannelName("");
      setContacts([]);
      setMenbers([]);
    };
  }, [openChannelDialog]);

  return (
    <Dialog open={openChannelDialog} onOpenChange={setOpenChannelDialog}>
      <DialogContent className="flex flex-col bg-[#181920] border-none text-white w-[400px] h-[400px]">
        <DialogHeader>
          <DialogTitle>Please select a contact</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative grid w-full max-w-sm items-center">
            <Label htmlFor="name">Search Contacts</Label>
            <div className="relative">
              <Input
                ref={searchRef}
                placeholder="Search Contacts"
                className="rounded-lg p-6 bg-[#2c2e3b] border-none mt-2"
                onChange={(e) => searchContacts(e.target.value)}
              />
              <div
                className={`${
                  contacts.length > 0 ? "block" : "hidden"
                } z-50 absolute top-1/2 right-2 -translate-y-1/4 cursor-pointer`}
                onClick={closeSearch}
              >
                <RiCloseFill className="text-2xl" />
              </div>
            </div>
            {contacts.length > 0 && (
              <div className="absolute -bottom-1 translate-y-full border-2 rounded-b-lg px-6 py-2 w-full h-[250px] bg-[#181920] overflow-y-auto scrollbar-hidden">
                <div className="flex flex-col gap-4">
                  {contacts.map((item) => (
                    <div key={item._id} className="flex gap-5">
                      <UserInfo user={item} />
                      <div
                        className="flex justify-between items-center flex-shrink-0 text-2xl px-2 cursor-pointer"
                        onClick={() => handleAddMember(item)}
                      >
                        <FaPlus />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name">Channel</Label>
            <Input
              type="text"
              id="name"
              placeholder="Channel"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label>Channel Contacts</Label>
            <div className="flex flex-wrap gap-2 border-2 border-white rounded-lg py-2 px-4 min-h-12 max-h-20 overflow-y-auto scrollbar-hidden">
              {members.map((item) => (
                <Badge
                  key={item._id}
                  className=" flex gap-1 text-white border-2 border-white cursor-pointer"
                >
                  <span>{item.userName}</span>
                  <RiCloseFill
                    className="text-lg"
                    onClick={() => handleDeleteMember(item)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <Button
            className="p-6 rounded-full bg-purple-600 hover:bg-purple-700"
            onClick={handleCreateChannel}
          >
            Create Channel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDialog;
