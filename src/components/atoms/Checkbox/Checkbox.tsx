import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onChange, label, id, indeterminate, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="checkbox"
            className={cn(
              "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
              className
            )}
            ref={combinedRef}
            id={checkboxId}
            onChange={(e) => onChange?.(e.target.checked)}
            {...props}
          />
          {indeterminate ? (
            <Minus className="absolute left-0 top-0 h-4 w-4 text-primary-foreground opacity-100 pointer-events-none" />
          ) : (
            <Check className="absolute left-0 top-0 h-4 w-4 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none" />
          )}
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
