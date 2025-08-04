import * as React from "react";
import { useState } from "react";
import { Input } from "./Input";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={show ? "text" : "password"}
          className={`pr-10 ${className || ""}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground"
          tabIndex={-1}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
