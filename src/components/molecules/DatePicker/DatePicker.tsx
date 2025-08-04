import * as React from "react";
import { cn } from "../../../utils/cn";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    { value, onChange, placeholder = "Pick a date", className, disabled },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = e.target.value ? new Date(e.target.value) : undefined;
      onChange?.(date);
    };

    return (
      <input
        ref={ref}
        type="date"
        className={cn(
          "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        value={value ? value.toISOString().split("T")[0] : ""}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
