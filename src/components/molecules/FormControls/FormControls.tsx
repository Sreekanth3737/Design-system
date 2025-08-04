import * as React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input, PasswordInput } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { Select, SelectOption } from "../../atoms/Select";
import { Checkbox } from "../../atoms/Checkbox";
import { RadioGroup, RadioOption } from "../../atoms/RadioGroup";
import { DatePicker } from "../DatePicker";
import { TagInput } from "../TagInput";
import { ColorPicker } from "../ColorPicker";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { FormElement } from "../../organisms/DynamicForm/types";

interface BaseFormControlProps<T extends FieldValues> {
  element: FormElement<T>;
  control: Control<T>;
}

// Text Input Control
export const TextInputControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        {element.type === "password" ? (
          <PasswordInput
            {...field}
            placeholder={element.placeholder}
            disabled={element.disabled}
            className={element.className}
          />
        ) : (
          <Input
            {...field}
            type={element.type}
            placeholder={element.placeholder}
            disabled={element.disabled}
            className={element.className}
          />
        )}
      </FormFieldWrapper>
    )}
  />
);

// Textarea Control
export const TextareaControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <Textarea
          {...field}
          placeholder={element.placeholder}
          rows={element.rows || 3}
          disabled={element.disabled}
          className={element.className}
        />
      </FormFieldWrapper>
    )}
  />
);

// Select Control
export const SelectControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <Select
          {...field}
          options={element.options as SelectOption[]}
          placeholder={element.placeholder}
          disabled={element.disabled}
          className={element.className}
        />
      </FormFieldWrapper>
    )}
  />
);

// Checkbox Control
export const CheckboxControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        error={error?.message}
        helperText={element.helperText}
        hideLabel
      >
        <Checkbox
          checked={field.value}
          onChange={field.onChange}
          label={element.label}
          disabled={element.disabled}
        />
      </FormFieldWrapper>
    )}
  />
);

// Radio Group Control
export const RadioControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <RadioGroup
          options={element.options as RadioOption[]}
          value={field.value}
          onChange={field.onChange}
          name={element.name as string}
          disabled={element.disabled}
          className={element.className}
        />
      </FormFieldWrapper>
    )}
  />
);

// Date Picker Control
export const DateControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <DatePicker
          value={field.value ? new Date(field.value) : undefined}
          onChange={(date) => field.onChange(date?.toISOString())}
          placeholder={element.placeholder}
          disabled={element.disabled}
          className={element.className}
        />
      </FormFieldWrapper>
    )}
  />
);

// Color Picker Control
export const ColorControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <ColorPicker
          value={field.value}
          onChange={field.onChange}
          colors={element.colorOptions || []}
          disabled={element.disabled}
          className={element.className}
          allowCustomColor={element.allowCustomColor}
        />
      </FormFieldWrapper>
    )}
  />
);

// Tag Input Control
export const TagControl = <T extends FieldValues>({
  element,
  control,
}: BaseFormControlProps<T>) => (
  <Controller
    name={element.name as Path<T>}
    control={control}
    rules={element.validation}
    render={({ field, fieldState: { error } }) => (
      <FormFieldWrapper
        label={element.label}
        error={error?.message}
        helperText={element.helperText}
        required={!!element.validation?.required}
      >
        <TagInput
          value={field.value || []}
          onChange={field.onChange}
          placeholder={element.placeholder}
          disabled={element.disabled}
          className={element.className}
          maxTags={element.maxTags}
          allowDuplicates={element.allowDuplicates}
          tagValidator={element.tagValidator}
        />
      </FormFieldWrapper>
    )}
  />
);
