import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import victory from '../../assets/icon/victory.svg'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import server from '@/utils/server'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPssword] = useState('')

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
  }

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
  }

  const handleLoginClick = async () => { 
    if (validateLogin()) {
      const response = await server.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      if (response.data.user.profileSetup) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
      console.log(response);
    }
  }

  const handleSignupClick = async () => { 
    if (validateSignup()) {
      const response = await server.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status === 201) { 
        navigate("/profile");
      }
      console.log(response);
    }
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="grid xl:grid-cols-2 w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-5xl md:text-6xl">Welcome</h1>
              <img src={victory} alt='logo' className='h-[100px]' />
            </div>
            <div className=' font-medium text-center'>
              Fill in the details to get started with the best chat app!
            </div>
          </div>
          <div className='flex justify-center items-center w-full'>
            <Tabs className='w-3/4' defaultValue='login'>
              <TabsList className="w-full bg-transparent rounded-none mb-4">
                <TabsTrigger value="login" className="w-full text-black text-opacity-90 border-b-2 rounded-none p-3 transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-full text-black text-opacity-90 border-b-2 rounded-none p-3 transition-all duration-300 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-purple-500">Signup</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="p-6 roundeed-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value) }
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="p-6 roundeed-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                />
                <Button className="p-6 rounded-full" onClick={handleLoginClick}>Login</Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5 mt-0 ">
                <Input
                  placeholder="Email"
                  type="email"
                  className="p-6 roundeed-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value) }
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="p-6 roundeed-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                />
                <Input
                  placeholder="confirmPassword"
                  type="password"
                  className="p-6 roundeed-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPssword(e.target.value) }
                />
                <Button className="p-6 rounded-full" onClick={handleSignupClick}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={logo} alt='auth background' className='h-[500px]' />
        </div>
      </div>
    </div>
  )
}

export default Auth