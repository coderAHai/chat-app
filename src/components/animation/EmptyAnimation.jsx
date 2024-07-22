import { useLottie } from "lottie-react";
import animationData from "@/assets/animation/lottie.json";

const EmptyAnimation = ({ width, height }) => {
  const style = { width, height };
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default EmptyAnimation;
