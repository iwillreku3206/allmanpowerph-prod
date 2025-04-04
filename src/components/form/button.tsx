import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"button">;

export function Button({ className = "", children, ...props }: ButtonProps) {
  const baseClass =
    "px-8 py-3 rounded-md hover:brightness-125 transition-all shadow-lg w-full";
  const animationClass =
    "motion-translate-y-in-25 motion-ease-bounce motion-duration-150";

  return (
    <button className={cn(baseClass, animationClass, className)} {...props}>
      {children}
    </button>
  );
}
