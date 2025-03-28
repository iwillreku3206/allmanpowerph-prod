import { cn } from "@/lib/utils";

export function ButtonServer({ className = '', type, children, ...props }: {
  className?: string,
  children?: React.ReactNode,
  type?: "submit" | "reset" | "button"
}) {

  // Base class of button
  // The only reason we factor sht out
  const baseClass = 'px-8 py-3 rounded-md hover:brightness-125 transition-all shadow-lg w-full';
  const animationClass = 'motion-translate-y-in-25 motion-ease-bounce motion-duration-150';

  return (
    <button
      className={cn(baseClass, animationClass, className)}
      type={type}
      {...props}
    >
      {children}
    </button>)
}
