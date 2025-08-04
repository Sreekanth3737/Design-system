import React, { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { Checkbox } from "../../../atoms/Checkbox";
import { Column, SortConfig } from "../types";

interface TableHeaderProps<T extends Record<string, any>> {
  columns: Column<T>[];
  sortConfig: SortConfig<T> | null;
  onSort: (key: keyof T) => void;
  sortable?: boolean;
  selectable?: boolean;
  selectAllChecked?: boolean;
  selectAllIndeterminate?: boolean;
  onSelectAll?: () => void;
  showActions?: boolean;
  className?: string;
}

const TableHeader = <T extends Record<string, any>>({
  columns,
  sortConfig,
  onSort,
  sortable = true,
  selectable = false,
  selectAllChecked = false,
  selectAllIndeterminate = false,
  onSelectAll,
  showActions = false,
  className,
}: TableHeaderProps<T>) => {
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <thead className={cn("bg-muted/50", className)}>
      <tr>
        {/* Selection column */}
        {selectable && (
          <th className="w-12 p-4" role="columnheader">
            <Checkbox
              checked={selectAllChecked}
              indeterminate={selectAllIndeterminate}
              onChange={onSelectAll}
              aria-label="Select all rows"
            />
          </th>
        )}

        {/* Data columns */}
        {visibleColumns.map((column) => (
          <th
            key={column.key as string}
            role="columnheader"
            scope="col"
            className={cn(
              "p-4 text-left font-medium text-muted-foreground",
              column.sortable &&
                sortable &&
                "cursor-pointer hover:text-foreground select-none",
              column.align === "center" && "text-center",
              column.align === "right" && "text-right",
              column.className
            )}
            style={{
              width: column.width,
              minWidth: column.minWidth,
            }}
            onClick={() => column.sortable && sortable && onSort(column.key)}
            tabIndex={column.sortable && sortable ? 0 : undefined}
            onKeyDown={(e) => {
              if (
                column.sortable &&
                sortable &&
                (e.key === "Enter" || e.key === " ")
              ) {
                e.preventDefault();
                onSort(column.key);
              }
            }}
            aria-sort={
              column.sortable && sortConfig?.key === column.key
                ? sortConfig.direction === "asc"
                  ? "ascending"
                  : "descending"
                : column.sortable
                ? "none"
                : undefined
            }
            title={column.description}
          >
            <div className="flex items-center gap-2">
              {column.headerRender ? (
                column.headerRender(column)
              ) : (
                <span>{column.header}</span>
              )}

              {column.sortable && sortable && (
                <div className="flex flex-col" aria-hidden="true">
                  <ChevronUp
                    className={cn(
                      "w-3 h-3 -mb-1 transition-colors",
                      sortConfig?.key === column.key &&
                        sortConfig.direction === "asc"
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-colors",
                      sortConfig?.key === column.key &&
                        sortConfig.direction === "desc"
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    )}
                  />
                </div>
              )}
            </div>
          </th>
        ))}

        {/* Actions column */}
        {showActions && (
          <th className="w-24 p-4 text-right" role="columnheader">
            <span className="sr-only">Actions</span>
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
};

TableHeader.displayName = "TableHeader";

export default memo(TableHeader) as typeof TableHeader;
