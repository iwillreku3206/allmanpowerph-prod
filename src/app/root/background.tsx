import { LANDING_BG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Background() {
  return (
    <img
      className="absolute object-cover h-[100vh] right-0 scale-x-[-1] motion-translate-x-in-[-5%] motion-blur-in-md brightness-200"
      src={LANDING_BG}
    />
  );
}
