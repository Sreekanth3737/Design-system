import React, { memo } from "react";
import { Search, Filter, X } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { Input } from "../../../atoms/Input";
import { Button } from "../../../atoms/Button";
import { Badge } from "../../../atoms/Badge";
import { Column } from "../types";

interface TableToolbarProps<T extends Record<string, any>> {
  // Search
  searchEnabled?: boolean;
  searchQuery?: string;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;

  // Filtering
  filteringEnabled?: boolean;
  columns?: Column<T>[];
  filters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;
  maxColumnFilters?: number;

  // Selection
  selectedCount?: number;
  totalCount?: number;
  onClearSelection?: () => void;

  // Custom actions
  actions?: React.ReactNode;

  // Styling
  className?: string;
  compact?: boolean;
}

const TableToolbar = <T extends Record<string, any>>({
  searchEnabled = false,
  searchQuery = "",
  searchPlaceholder = "Search...",
  onSearchChange,
  filteringEnabled = false,
  columns = [],
  filters = {},
  onFilterChange,
  maxColumnFilters = 2,
  selectedCount = 0,
  totalCount = 0,
  onClearSelection,
  actions,
  className,
  compact = false,
}: TableToolbarProps<T>) => {
  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== ""
  );
  const filterableColumns = columns
    .filter((col) => !col.hidden && col.key !== "actions")
    .slice(0, maxColumnFilters);

  const handleFilterChange = (columnKey: string, value: string) => {
    if (onFilterChange) {
      const newFilters = { ...filters, [columnKey]: value };
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    if (onFilterChange) {
      const clearedFilters = Object.keys(filters).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {} as Record<string, any>);
      onFilterChange(clearedFilters);
    }
  };

  // Don't render if no features are enabled
  if (!searchEnabled && !filteringEnabled && selectedCount === 0 && !actions) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-4", compact && "gap-2", className)}>
      {/* Main toolbar row */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Left side: Search and filters */}
        <div className="flex flex-wrap gap-4 items-center flex-1 min-w-0">
          {/* Search */}
          {searchEnabled && (
            <div className="relative flex-1 min-w-64 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10"
                aria-label="Search table data"
              />
            </div>
          )}

          {/* Column filters */}
          {filteringEnabled && filterableColumns.length > 0 && (
            <div className="flex gap-2 items-center">
              <Filter
                className="w-4 h-4 text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              {filterableColumns.map((column) => (
                <div key={column.key as string} className="relative">
                  <Input
                    type="search"
                    placeholder={`Filter ${column.header}`}
                    value={filters[column.key as string] || ""}
                    onChange={(e) =>
                      handleFilterChange(column.key as string, e.target.value)
                    }
                    className="w-40"
                    aria-label={`Filter by ${column.header}`}
                  />
                  {filters[column.key as string] && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleFilterChange(column.key as string, "")
                      }
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                      aria-label={`Clear ${column.header} filter`}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}

              {/* Clear all filters */}
              {hasActiveFilters && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Clear all filters"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right side: Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Selection info and active filters */}
      {(selectedCount > 0 || hasActiveFilters) && (
        <div className="flex flex-wrap gap-2 items-center">
          {/* Selection info */}
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {selectedCount} of {totalCount} selected
              </Badge>
              {onClearSelection && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClearSelection}
                  className="h-6 px-2 text-xs"
                  aria-label="Clear selection"
                >
                  Clear selection
                </Button>
              )}
            </div>
          )}

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === "") return null;

                const column = columns.find((col) => col.key === key);
                const columnName = column?.header || key;

                return (
                  <Badge key={key} variant="outline" className="text-xs gap-1">
                    <span>
                      {columnName}: {value}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFilterChange(key, "")}
                      className="h-4 w-4 p-0 hover:bg-gray-100 ml-1"
                      aria-label={`Remove ${columnName} filter`}
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TableToolbar.displayName = "TableToolbar";

export default memo(TableToolbar) as typeof TableToolbar;
