import { cn } from "@/lib/utils";

type Option = {
  id: string;
  name: string;
  [key: string]: any;
};

type SelectProps = {
  className?: string;
  options: Option[];
} & React.ComponentProps<"select">;

export function Select({
  className = "",
  options = [],
  ...props
}: SelectProps) {
  const baseClass =
    "p-3 rounded-md border-[1px] border-solid border-[rgba(0, 0, 0, 0.75)] outline-none hover:cursor-pointer hover:brightness-95 transition-all";
  const animationClass = "";

  return (
    <select className={cn(baseClass, animationClass, className)} {...props}>
      <option selected disabled>
        --
      </option>
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id} className="p-2">
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
