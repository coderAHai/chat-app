import AuthContent from "@/components/auth/AuthContent";
import victory from "../../assets/icon/victory.svg";
import logo from "../../assets/images/logo.png";

const Auth = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="grid xl:grid-cols-2 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-5xl md:text-6xl">Welcome</h1>
              <img src={victory} alt="logo" className="h-[100px]" />
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <AuthContent />
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={logo} alt="auth background" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
