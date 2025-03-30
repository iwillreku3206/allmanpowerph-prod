import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

export function Button({
  className = "",
  onClick = () => {},
  children,
  type,
  disabled,
  ...props
}: {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  // Base class of button
  // The only reason we factor sht out
  const baseClass =
    "px-8 py-3 rounded-md hover:brightness-125 transition-all shadow-lg w-full";
  const animationClass =
    "motion-translate-y-in-25 motion-ease-bounce motion-duration-150";

  return (
    <button
      className={cn(baseClass, animationClass, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
