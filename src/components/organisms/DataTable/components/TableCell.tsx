import React, { memo, useCallback } from "react";
import { cn } from "../../../../utils/cn";
import { Input } from "../../../atoms/Input";
import { Checkbox } from "../../../atoms/Checkbox";
import { Select } from "../../../atoms/Select";
import { Column, ColumnType } from "../types";
import { SelectOption } from "../../../atoms/Select/Select";

interface TableCellProps<T extends Record<string, any>> {
  column: Column<T>;
  row: T;
  rowIndex: number;
  isEditing?: boolean;
  editingValue?: any;
  onFieldChange?: (key: keyof T, value: any) => void;
  validationError?: string;
  className?: string;
}

const TableCell = <T extends Record<string, any>>({
  column,
  row,
  rowIndex,
  isEditing = false,
  editingValue,
  onFieldChange,
  validationError,
  className,
}: TableCellProps<T>) => {
  const value = isEditing ? editingValue : row[column.key];

  const handleChange = useCallback(
    (newValue: any) => {
      if (onFieldChange) {
        onFieldChange(column.key, newValue);
      }
    },
    [column.key, onFieldChange]
  );

  const renderEditingCell = useCallback(() => {
    if (!isEditing) return null;

    const commonProps = {
      className: cn(
        "h-8 text-xs w-full",
        validationError && "border-red-500 focus:border-red-500"
      ),
      "aria-invalid": validationError ? true : false,
      "aria-describedby": validationError
        ? `${column.key as string}-error`
        : undefined,
    };

    switch (column.type) {
      case "select":
        // Convert ColumnSelectOption to SelectOption format
        const selectOptions: SelectOption[] = (column.options || []).map(
          (option) => ({
            label: option.label,
            value: option.value,
          })
        );

        return (
          <div className="space-y-1">
            <Select
              value={value?.toString() || ""}
              onChange={handleChange}
              options={selectOptions}
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-1">
            <Checkbox
              checked={Boolean(value)}
              onChange={handleChange}
              aria-invalid={validationError ? true : false}
              aria-describedby={
                validationError ? `${column.key as string}-error` : undefined
              }
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "number":
        return (
          <div className="space-y-1">
            <Input
              type="number"
              value={value?.toString() || ""}
              onChange={(e) =>
                handleChange(e.target.value ? Number(e.target.value) : "")
              }
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "email":
        return (
          <div className="space-y-1">
            <Input
              type="email"
              value={value?.toString() || ""}
              onChange={(e) => handleChange(e.target.value)}
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "url":
        return (
          <div className="space-y-1">
            <Input
              type="url"
              value={value?.toString() || ""}
              onChange={(e) => handleChange(e.target.value)}
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "date":
        return (
          <div className="space-y-1">
            <Input
              type="date"
              value={value?.toString() || ""}
              onChange={(e) => handleChange(e.target.value)}
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );

      case "text":
      default:
        return (
          <div className="space-y-1">
            <Input
              type="text"
              value={value?.toString() || ""}
              onChange={(e) => handleChange(e.target.value)}
              {...commonProps}
            />
            {validationError && (
              <div
                id={`${column.key as string}-error`}
                className="text-xs text-red-600"
                role="alert"
              >
                {validationError}
              </div>
            )}
          </div>
        );
    }
  }, [isEditing, value, handleChange, column, validationError]);

  const renderDisplayCell = useCallback(() => {
    if (isEditing) return null;

    // Use custom render function if provided
    if (column.render) {
      return column.render(value, row, rowIndex);
    }

    // Handle different data types for display
    switch (column.type) {
      case "boolean":
        return (
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              value
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {value ? "Yes" : "No"}
          </span>
        );

      case "number":
        return (
          <span className="font-mono">
            {value != null ? value.toLocaleString() : ""}
          </span>
        );

      case "email":
        return value ? (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        );

      case "url":
        return value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        );

      case "date":
        return value ? (
          <span className="font-mono text-sm">
            {new Date(value).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        );

      case "select":
        const option = column.options?.find((opt) => opt.value === value);
        return option ? option.label : value?.toString() || "-";

      default:
        return (
          value?.toString() || <span className="text-muted-foreground">-</span>
        );
    }
  }, [isEditing, column, value, row, rowIndex]);

  return (
    <td
      className={cn(
        "p-4 transition-colors",
        column.align === "center" && "text-center",
        column.align === "right" && "text-right",
        isEditing && "bg-yellow-50",
        className
      )}
      style={{
        width: column.width,
        minWidth: column.minWidth,
      }}
    >
      {isEditing ? renderEditingCell() : renderDisplayCell()}
    </td>
  );
};

TableCell.displayName = "TableCell";

export default memo(TableCell) as typeof TableCell;
