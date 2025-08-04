import * as React from "react";
import { cn } from "../../../utils/cn";
import { Label } from "../../atoms/Label";

export interface FormFieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  fieldId?: string;
  hideLabel?: boolean;
}

const FormFieldWrapper = React.forwardRef<
  HTMLDivElement,
  FormFieldWrapperProps
>(
  (
    {
      children,
      label,
      error,
      helperText,
      required = false,
      className,
      fieldId,
      hideLabel = false,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = fieldId || generatedId;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Label */}
        {label && !hideLabel && (
          <Label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium",
              required && "after:content-['*'] after:ml-0.5 after:text-red-500",
              error && "text-red-700"
            )}
          >
            {label}
          </Label>
        )}

        {/* Field Content */}
        <div className="relative">
          {React.cloneElement(children as React.ReactElement, {
            id,
            className: cn(
              (children as React.ReactElement).props?.className,
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            ),
            "aria-invalid": error ? "true" : "false",
            "aria-describedby":
              error || helperText ? `${id}-description` : undefined,
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${id}-description`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={`${id}-description`} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormFieldWrapper.displayName = "FormFieldWrapper";

export { FormFieldWrapper };
