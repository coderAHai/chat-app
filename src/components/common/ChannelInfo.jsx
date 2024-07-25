import { Avatar } from "@/components/ui/avatar";

const ChannelInfo = ({ channel }) => {
  return (
    <div className="flex items-center w-full gap-3">
      <div className="relative w-12 h-12">
        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
          <div className="flex justify-center items-center w-12 h-12 uppercase border-2 rounded-full text-center">
            <span>#</span>
          </div>
        </Avatar>
      </div>
      <div className="text-sm">
        <p className="line-clamp-1">频道名称：{channel.name}</p>
        <p className="line-clamp-1">创建人：{channel.admin.userName}</p>
      </div>
    </div>
  );
};

export default ChannelInfo;
