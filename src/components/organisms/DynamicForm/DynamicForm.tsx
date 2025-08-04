import * as React from "react";
import {
  useForm,
  FieldValues,
  Control,
  DefaultValues,
  SubmitHandler,
} from "react-hook-form";
import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";
import { Alert } from "../../molecules/Alert";
import {
  TextInputControl,
  TextareaControl,
  SelectControl,
  CheckboxControl,
  RadioControl,
  DateControl,
  ColorControl,
  TagControl,
} from "../../molecules/FormControls";
import { FormFieldWrapper } from "../../molecules/FormFieldWrapper";
import {
  DynamicFormProps,
  FormElement,
  FormRow,
  FormItem,
  InputType,
} from "./types";

const DynamicForm = <T extends FieldValues>({
  elements,
  onSubmit,
  defaultValues,
  className,
  submitButtonText = "Submit",
  hideSubmitButton = false,
  isSubmitting = false,
  form: externalForm,
  mode = "onSubmit",
  resetOnSubmit = false,
  showErrorSummary = false,
}: DynamicFormProps<T>) => {
  const internalForm = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode,
  });

  const form = externalForm || internalForm;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // Error summary for accessibility
  const errorEntries = Object.entries(errors);
  const hasErrors = errorEntries.length > 0;

  const handleFormSubmit: SubmitHandler<T> = async (data: T) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Helper function to check if an item is a FormRow
  const isFormRow = (item: FormItem<T>): item is FormRow<T> => {
    return (item as FormRow<T>).type === "row";
  };

  // Helper function to get width classes
  const getWidthClass = (width?: string): string => {
    switch (width) {
      case "1/2":
        return "w-1/2";
      case "1/3":
        return "w-1/3";
      case "2/3":
        return "w-2/3";
      case "1/4":
        return "w-1/4";
      case "3/4":
        return "w-3/4";
      case "full":
        return "w-full";
      default:
        return "flex-1"; // Equal width by default
    }
  };

  const renderFormControl = (element: FormElement<T>): React.ReactNode => {
    const controlProps = {
      element,
      control: control as Control<T>,
    };

    switch (element.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return <TextInputControl {...controlProps} />;

      case "textarea":
        return <TextareaControl {...controlProps} />;

      case "select":
        return <SelectControl {...controlProps} />;

      case "checkbox":
        return <CheckboxControl {...controlProps} />;

      case "radio":
        return <RadioControl {...controlProps} />;

      case "date":
        return <DateControl {...controlProps} />;

      case "color":
        return <ColorControl {...controlProps} />;

      case "tags":
        return <TagControl {...controlProps} />;

      case "group":
        return (
          <GroupControl element={element} control={control as Control<T>} />
        );

      default:
        console.warn(`Unsupported input type: ${element.type}`);
        return null;
    }
  };

  const renderFormItem = (
    item: FormItem<T>,
    index: number
  ): React.ReactNode => {
    if (isFormRow(item)) {
      // Render row with multiple elements
      return (
        <div
          key={`row-${index}`}
          className={cn("flex", item.gap || "gap-4", item.className)}
        >
          {item.elements.map((element, elementIndex) => (
            <div
              key={element.name as string}
              className={cn(getWidthClass(element.width), element.className)}
            >
              {renderFormControl(element)}
            </div>
          ))}
        </div>
      );
    } else {
      // Render single element
      return (
        <div key={item.name as string} className="space-y-2">
          {renderFormControl(item)}
        </div>
      );
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Error Summary */}
      {showErrorSummary && hasErrors && (
        <Alert variant="destructive" className="mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">
              Please fix the following errors:
            </h3>
            <ul className="text-sm space-y-1">
              {errorEntries.map(([fieldName, error]) => (
                <li key={fieldName}>
                  • {(error as any)?.message || `Error in ${fieldName}`}
                </li>
              ))}
            </ul>
          </div>
        </Alert>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {elements.map((item, index) => renderFormItem(item, index))}

        {/* Submit Button */}
        {!hideSubmitButton && (
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting} className="min-w-24">
              {isSubmitting ? "Submitting..." : submitButtonText}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

// Group Control Component
interface GroupControlProps<T extends FieldValues> {
  element: FormElement<T>;
  control: Control<T>;
}

const GroupControl = <T extends FieldValues>({
  element,
  control,
}: GroupControlProps<T>) => {
  if (!element.children) return null;

  return (
    <FormFieldWrapper
      label={element.groupTitle || element.label}
      className={cn("p-4 border rounded-md bg-gray-50", element.groupClassName)}
    >
      <div className="space-y-4">
        {element.children.map((child) => {
          const controlProps = {
            element: child,
            control: control as Control<T>,
          };

          switch (child.type) {
            case "text":
            case "email":
            case "password":
            case "number":
              return (
                <TextInputControl
                  key={child.name as string}
                  {...controlProps}
                />
              );

            case "textarea":
              return (
                <TextareaControl key={child.name as string} {...controlProps} />
              );

            case "select":
              return (
                <SelectControl key={child.name as string} {...controlProps} />
              );

            case "checkbox":
              return (
                <CheckboxControl key={child.name as string} {...controlProps} />
              );

            case "radio":
              return (
                <RadioControl key={child.name as string} {...controlProps} />
              );

            case "date":
              return (
                <DateControl key={child.name as string} {...controlProps} />
              );

            case "color":
              return (
                <ColorControl key={child.name as string} {...controlProps} />
              );

            case "tags":
              return (
                <TagControl key={child.name as string} {...controlProps} />
              );

            default:
              console.warn(`Unsupported input type in group: ${child.type}`);
              return null;
          }
        })}
      </div>
    </FormFieldWrapper>
  );
};

export { DynamicForm };
