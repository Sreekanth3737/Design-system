import * as React from "react";
import { cn } from "../../../utils/cn";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, name, className, disabled, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                "text-sm font-medium leading-none",
                disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
