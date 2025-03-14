
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  filePreview?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, filePreview, ...props }, ref) => {
    return (
      <>
        {type === "file" && filePreview && (
          <div className="mb-2 relative w-24 h-24 overflow-hidden rounded-md border border-input">
            <img 
              src={filePreview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            type === "file" && "cursor-pointer file:cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
