import { cn } from "@/lib/utils";

export function Divider() {
  const baseClass = "w-full border-b-2 border-red my-8";
  const animationClass = "motion-translate-x-in-[-5%] motion-opacity-in-0";

  return <div className={cn(baseClass, animationClass)}></div>;
}
