import React, { memo, useCallback } from "react";
import { Edit2, Save, X, MoreHorizontal } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { Button } from "../../../atoms/Button";
import { Checkbox } from "../../../atoms/Checkbox";
import { Column, RowAction } from "../types";
import TableCell from "./TableCell";

interface TableRowProps<T extends Record<string, any>> {
  row: T;
  rowIndex: number;
  columns: Column<T>[];
  isSelected?: boolean;
  isEditing?: boolean;
  editingData?: T | null;
  validationErrors?: Record<string, string>;
  selectable?: boolean;
  editable?: boolean;
  rowActions?: RowAction<T>[];
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  onRowContextMenu?: (row: T, index: number, event: React.MouseEvent) => void;
  onSelectRow?: (row: T, index: number) => void;
  onStartEdit?: (row: T, index: number) => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  onFieldChange?: (key: keyof T, value: any) => void;
  getRowClassName?: (row: T, index: number) => string;
  getRowKey?: (row: T, index: number) => string | number;
  hoverable?: boolean;
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

const TableRow = <T extends Record<string, any>>({
  row,
  rowIndex,
  columns,
  isSelected = false,
  isEditing = false,
  editingData,
  validationErrors = {},
  selectable = false,
  editable = false,
  rowActions = [],
  onRowClick,
  onRowDoubleClick,
  onRowContextMenu,
  onSelectRow,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onFieldChange,
  getRowClassName,
  getRowKey,
  hoverable = true,
  striped = false,
  compact = false,
  className,
}: TableRowProps<T>) => {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const rowKey = getRowKey ? getRowKey(row, rowIndex) : rowIndex;
  const customRowClassName = getRowClassName
    ? getRowClassName(row, rowIndex)
    : "";

  const handleRowClick = useCallback(
    (event: React.MouseEvent) => {
      // Don't trigger row click if clicking on interactive elements
      if (event.target instanceof HTMLElement) {
        const interactiveElements = [
          "button",
          "input",
          "select",
          "textarea",
          "a",
        ];
        if (interactiveElements.includes(event.target.tagName.toLowerCase())) {
          return;
        }
      }

      if (onRowClick) {
        onRowClick(row, rowIndex);
      }
    },
    [onRowClick, row, rowIndex]
  );

  const handleRowDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      if (onRowDoubleClick) {
        onRowDoubleClick(row, rowIndex);
      }
    },
    [onRowDoubleClick, row, rowIndex]
  );

  const handleRowContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (onRowContextMenu) {
        event.preventDefault();
        onRowContextMenu(row, rowIndex, event);
      }
    },
    [onRowContextMenu, row, rowIndex]
  );

  const handleSelectRow = useCallback(() => {
    if (onSelectRow) {
      onSelectRow(row, rowIndex);
    }
  }, [onSelectRow, row, rowIndex]);

  const handleStartEdit = useCallback(() => {
    if (onStartEdit) {
      onStartEdit(row, rowIndex);
    }
  }, [onStartEdit, row, rowIndex]);

  const renderActions = useCallback(() => {
    if (!editable && rowActions.length === 0) return null;

    return (
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Inline editing actions */}
          {editable && (
            <>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onSaveEdit}
                    className="h-8 w-8 p-0"
                    aria-label="Save changes"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancelEdit}
                    className="h-8 w-8 p-0"
                    aria-label="Cancel editing"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStartEdit}
                  className="h-8 w-8 p-0"
                  aria-label="Edit row"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </>
          )}

          {/* Custom row actions */}
          {rowActions.map((action) => {
            const disabled =
              typeof action.disabled === "function"
                ? action.disabled(row, rowIndex)
                : action.disabled;

            return (
              <Button
                key={action.key}
                size="sm"
                variant={action.variant || "outline"}
                onClick={() => action.onClick(row, rowIndex)}
                disabled={disabled}
                className="h-8 w-8 p-0"
                aria-label={action.label}
                title={action.label}
              >
                {action.icon || <MoreHorizontal className="w-4 h-4" />}
              </Button>
            );
          })}
        </div>
      </td>
    );
  }, [
    editable,
    rowActions,
    isEditing,
    onSaveEdit,
    onCancelEdit,
    handleStartEdit,
    row,
    rowIndex,
  ]);

  return (
    <tr
      key={rowKey}
      className={cn(
        "border-t transition-colors",
        hoverable && "hover:bg-muted/50",
        isSelected && "bg-blue-50 hover:bg-blue-100",
        isEditing && "bg-yellow-50 hover:bg-yellow-100",
        striped && rowIndex % 2 === 1 && "bg-muted/25",
        compact && "h-10",
        customRowClassName,
        className
      )}
      onClick={handleRowClick}
      onDoubleClick={handleRowDoubleClick}
      onContextMenu={handleRowContextMenu}
      role="row"
      aria-selected={isSelected}
      aria-rowindex={rowIndex + 2} // +2 because header is row 1
    >
      {/* Selection checkbox */}
      {selectable && (
        <td className="p-4" role="gridcell">
          <Checkbox
            checked={isSelected}
            onChange={handleSelectRow}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select row ${rowIndex + 1}`}
          />
        </td>
      )}

      {/* Data cells */}
      {visibleColumns.map((column) => (
        <TableCell
          key={column.key as string}
          column={column}
          row={row}
          rowIndex={rowIndex}
          isEditing={isEditing && column.editable}
          editingValue={editingData?.[column.key]}
          onFieldChange={onFieldChange}
          validationError={validationErrors[column.key as string]}
        />
      ))}

      {/* Actions */}
      {renderActions()}
    </tr>
  );
};

TableRow.displayName = "TableRow";

export default memo(TableRow) as typeof TableRow;
