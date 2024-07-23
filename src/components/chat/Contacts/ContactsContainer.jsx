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
import { useState } from "react";
import ContactsDialog from "./ContactsDialog";

const ContactsContainer = () => {
  const [openDialog, setOpenDialog] = useState(false);

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
