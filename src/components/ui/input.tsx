import { cn } from "@/lib/utils"
import { FormEventHandler } from "react"

export function Input({ className = '', type = 'text', value = '', placeholder = '', onChange = () => {}, ...props }: {
  className?: string,
  type?: string,
  value?: string,
  placeholder?: string,
  onChange?: FormEventHandler
}) {

  // Base class
  const baseClass = 'px-4 py-3 border border-gray-300 rounded-md text-form focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50';

  return (
    <input
      className={ cn(baseClass, className) }
      type={ type }
      value={ value }
      placeholder={ placeholder }
      onChange={ onChange }
      { ...props }
    >
      
    </input>)
}