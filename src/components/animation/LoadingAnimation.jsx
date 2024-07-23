import { useLottie } from "lottie-react";
import animationData from "@/assets/animation/loading.json";

const LoadingAnimation = ({ width, height }) => {
  const style = { width, height };
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div className="z-50 flex justify-center items-center fixed top-0 right-0 w-full h-full bg-[#1c1d25]">
      {View}
    </div>
  );
};

export default LoadingAnimation;
