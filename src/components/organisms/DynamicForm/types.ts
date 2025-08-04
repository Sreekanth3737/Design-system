import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { SelectOption } from "../../atoms/Select";
import { RadioOption } from "../../atoms/RadioGroup";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "color"
  | "tags"
  | "group";

export interface ValidationRules {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: any, formValues?: any) => boolean | string;
}

export interface FormElement<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type: InputType;
  placeholder?: string;
  helperText?: string;
  options?: SelectOption[] | RadioOption[];
  rows?: number;
  className?: string;
  children?: FormElement<T>[];
  validation?: ValidationRules;
  disabled?: boolean;

  // Color picker specific
  colorOptions?: string[];
  allowCustomColor?: boolean;

  // Tag input specific
  maxTags?: number;
  allowDuplicates?: boolean;
  tagValidator?: (tag: string) => boolean | string;

  // Group specific
  groupClassName?: string;
  groupTitle?: string;

  // Row layout specific
  width?: string; // e.g., "1/2", "1/3", "2/3", "1/4", "3/4", "full"
}

export interface FormRow<T extends FieldValues> {
  type: "row";
  elements: FormElement<T>[];
  className?: string;
  gap?: string; // e.g., "gap-2", "gap-4", "gap-6"
}

export type FormItem<T extends FieldValues> = FormElement<T> | FormRow<T>;

export interface DynamicFormProps<T extends FieldValues> {
  elements: FormItem<T>[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  className?: string;
  submitButtonText?: string;
  hideSubmitButton?: boolean;
  isSubmitting?: boolean;
  form?: UseFormReturn<T>;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  resetOnSubmit?: boolean;
  showErrorSummary?: boolean;
}
