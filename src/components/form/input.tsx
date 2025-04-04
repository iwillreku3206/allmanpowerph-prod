import { cn } from "@/lib/utils";

type InputProps = {
  className?: string;
} & React.ComponentProps<"input">;

export function Input({ className = "", ...props }: InputProps) {
  const baseClass =
    "px-4 py-3 border border-gray-300 rounded-md text-form focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50";
  const animationClass = "";

  return (
    <input
      className={cn(baseClass, animationClass, className)}
      {...props}
    ></input>
  );
}
