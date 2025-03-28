import { cn } from "@/lib/utils"
import { FormEventHandler } from "react"

export function InputServer({ className = '', type = 'text', placeholder = '', name = '', ...props }: {
  className?: string,
  name?: string,
  type?: string,
  placeholder?: string,
  onChange?: FormEventHandler
}) {

  // Base class
  const baseClass = 'px-4 py-3 border border-gray-300 rounded-md text-form focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50';

  return (
    <input
      className={cn(baseClass, className)}
      name={name}
      type={type}
      placeholder={placeholder}
      {...props}
    >

    </input>)
}
