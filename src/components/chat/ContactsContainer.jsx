import Logo from "../common/Logo";
import Title from "../common/Title";
import ContactsFooter from "./ContactsFooter";
import ContactsUser from "./ContactsUser";

const ContactsContainer = () => {
  return (
    <div className=" relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] h-full bg-[#1b1c24] border-r-2 border-[#2f303b]">
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Direct Messages" />
          <ContactsUser />
        </div>
      </div>
      <div className="my-5">
        <div className="flex justify-between items-center pr-10">
          <Title text="Channels" />
        </div>
      </div>
      <ContactsFooter />
    </div>
  );
};

export default ContactsContainer;
