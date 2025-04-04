import { cn } from "@/lib/utils";

type InputProps = {
  className?: string;
} & React.ComponentProps<"input">;

export function Input({ className = "", ...props }: InputProps) {
  const baseClass =
    "bg-muted px-4 py-3 border border-gray-300 rounded-sm texttype-form outline-none focus:bg-white focus:font-bold focus:ring-0 transition-color duration-150";
  const animationClass = "";

  return (
    <input
      spellCheck={false}
      className={cn(baseClass, animationClass, className)}
      {...props}
    ></input>
  );
}
