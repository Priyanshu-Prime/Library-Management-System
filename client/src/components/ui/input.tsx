import * as React from "react"
import { useState } from "react";
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  onSearch?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", onSearch, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
      if(onSearch && searchTerm != undefined) {
        onSearch(searchTerm);
      }
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        onChange={handleInputChange}
        onKeyDown={handleSearch}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
