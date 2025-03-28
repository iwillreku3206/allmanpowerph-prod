import { cn } from "@/lib/utils"
import { FormEventHandler, KeyboardEventHandler } from "react"

export function Input({ className = '', type = 'text', placeholder = '', name = '', onChange = () => { }, ...props }: {
  className?: string,
  name?: string,
  type?: string,
  placeholder?: string,
  value?: string
  onChange?: FormEventHandler
  onKeyDown?: KeyboardEventHandler
}) {

  // Base class
  const baseClass = 'px-4 py-3 border border-gray-300 rounded-md text-form focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50';

  return (
    <input
      className={cn(baseClass, className)}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    >

    </input>)
}
