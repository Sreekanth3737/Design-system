import * as React from "react";
import { cn } from "../../../utils/cn";
import { Label } from "../../atoms/Label";
import { Input, InputProps } from "../../atoms/Input";

export interface FormFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, helperText, error, required, className, labelProps, id, ...props },
    ref
  ) => {
    const inputId =
      id || `form-field-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              labelProps?.className
            )}
            {...labelProps}
          >
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {(helperText || error) && (
          <p
            className={cn(
              "text-sm",
              error ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
