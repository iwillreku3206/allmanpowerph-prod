import { LANDING_BG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Background() {
  const baseClass = "absolute object-cover opacity-50 h-[100vh]";
  const animationClass = "motion-translate-x-in-[-5%] motion-blur-in-md";

  return <img className={cn(baseClass, animationClass)} src={LANDING_BG} />;
}
