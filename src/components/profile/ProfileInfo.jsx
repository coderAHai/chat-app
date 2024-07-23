import { colors } from "@/utils/color";
import { Input } from "@/components/ui/input";

export const ProfileInfo = ({
  user,
  userName,
  color,
  setUserName,
  setColor,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 min-w-32 md:min-w-64 text-white">
      <div className="w-full">
        <Input
          placeholder="Email"
          type="email"
          disbaled="true"
          readOnly
          value={user.email}
          className="rounded-lg p-6 bg-[#2c2e3b] border-none"
        />
      </div>
      <div className="w-full">
        <Input
          placeholder="UserName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="rounded-lg p-6 bg-[#2c2e3b] border-none"
        />
      </div>
      <div className="flex gap-5 w-full">
        {colors.map((item, index) => (
          <div
            key={index}
            className={`
                    ${item}
                    ${
                      color === index
                        ? "outline outline-white/50 outline-2"
                        : ""
                    }
                    w-8 h-8 rounded-full cursor-pointer 
                  `}
            onClick={() => setColor(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
