import EmptyAnimation from "../animation/EmptyAnimation";

const EmptyContainer = () => {
  return (
    <div className="flex-1 hidden md:flex flex-col justify-center items-center duration-1000 transition-all md:bg-[#1c1d25]">
      <EmptyAnimation width={200} height={200} />
      <div className="flex flex-col gap-5 items-center mt-10 text-3xl lg:text-4xl text-opacity-80 text-white">
        <h3 className="flex gap-2">
          <span>Hi</span>
          <span className=" text-purple-500">!</span>
          <span className=" text-purple-500">Syncronus</span>
          <span>Chat App</span>
          <span className=" text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyContainer;
