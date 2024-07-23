import { useState } from "react";
import server from "@/utils/server";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/hooks/useUserStore";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AuthContent = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPssword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  const handleLoginClick = async () => {
    if (validateLogin()) {
      const response = await server.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.id) {
        setUserData(response.data);
        if (response.data.profileSetup) {
          navigate("/chat");
        } else {
          navigate("/profile");
        }
      }
    }
  };

  const handleSignupClick = async () => {
    if (validateSignup()) {
      const response = await server.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUserData(response.data);
        navigate("/profile");
      }
    }
  };

  return (
    <Tabs className="w-3/4" defaultValue="login">
      <TabsList className="w-full bg-transparent rounded-none mb-4">
        <TabsTrigger
          value="login"
          className="w-full text-black text-opacity-90 border-b-2 rounded-none p-3 transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="w-full text-black text-opacity-90 border-b-2 rounded-none p-3 transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500"
        >
          Signup
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="flex flex-col gap-5">
        <Input
          placeholder="Email"
          type="email"
          className="p-6 roundeed-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="p-6 roundeed-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="p-6 rounded-full" onClick={handleLoginClick}>
          Login
        </Button>
      </TabsContent>
      <TabsContent value="signup" className="flex flex-col gap-5 mt-0 ">
        <Input
          placeholder="Email"
          type="email"
          className="p-6 roundeed-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="p-6 roundeed-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="confirmPassword"
          type="password"
          className="p-6 roundeed-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPssword(e.target.value)}
        />
        <Button className="p-6 rounded-full" onClick={handleSignupClick}>
          Signup
        </Button>
      </TabsContent>
    </Tabs>
  );
};

export default AuthContent;
