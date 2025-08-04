import React, { memo, useMemo, useCallback, useRef, useEffect } from "react";
import { cn } from "../../../utils/cn";
import { DataTableProps } from "./types";
import {
  useTableData,
  useTableSelection,
  useTableEditing,
  useScrollPosition,
} from "./hooks";
import {
  TableHeader,
  TableRow,
  TableToolbar,
  TablePagination,
  TableEmptyState,
  TableLoadingState,
} from "./components";

/**
 * DataTable - A comprehensive, accessible, and performant table component
 *
 * Features:
 * - Sorting with visual indicators
 * - Search with debouncing
 * - Pagination with customizable page sizes
 * - Row selection (single/multiple)
 * - Inline editing with validation
 * - Column filtering
 * - Custom row actions
 * - Loading and empty states
 * - Responsive design
 * - Keyboard navigation
 * - Screen reader support
 * - Performance optimizations
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={userColumns}
 *   search={{ enabled: true, placeholder: "Search users..." }}
 *   pagination={{ enabled: true, pageSize: 10 }}
 *   selection={{ enabled: true, mode: "multiple" }}
 *   sorting={{ enabled: true }}
 * />
 * ```
 */
const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  className,

  // Core features
  sorting,
  search,
  pagination,
  selection,
  filtering,
  editing,

  // UI configuration
  loading,
  emptyState,
  rowActions = [],
  accessibility,

  // Layout & styling
  compact = false,
  bordered = false,
  hoverable = true,
  striped = false,
  size = "md",
  responsive = true,
  maxHeight,
  virtual = false,
  virtualRowHeight = 48,

  // Advanced features
  rowRenderer,
  emptyRenderer,
  loadingRenderer,
  onRowClick,
  onRowDoubleClick,
  onRowContextMenu,
  getRowKey,
  getRowClassName,
  preserveScrollPosition = false,
}: DataTableProps<T>) => {
  // Scroll position management
  const { scrollRef, saveScrollPosition, restoreScrollPosition } =
    useScrollPosition(preserveScrollPosition);

  // Data processing pipeline
  const tableData = useTableData(data, columns, {
    search,
    sorting,
    filtering,
    pagination,
  });

  // Selection management
  const tableSelection = useTableSelection(tableData.processedData, selection);

  // Editing management
  const tableEditing = useTableEditing(editing);

  // Memoized visible columns
  const visibleColumns = useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns]
  );

  // Memoized table configuration
  const tableConfig = useMemo(
    () => ({
      hasActions: editing?.enabled || rowActions.length > 0,
      hasSelection: selection?.enabled,
      isLoading: loading?.isLoading,
      isEmpty: tableData.processedData.length === 0,
      hasData: data.length > 0,
    }),
    [
      editing?.enabled,
      rowActions.length,
      selection?.enabled,
      loading?.isLoading,
      tableData.processedData.length,
      data.length,
    ]
  );

  // Save scroll position before data changes
  useEffect(() => {
    if (preserveScrollPosition) {
      saveScrollPosition();
    }
  }, [data, saveScrollPosition, preserveScrollPosition]);

  // Toolbar actions
  const toolbarActions = useMemo(() => {
    if (tableSelection.selectedRows.length === 0) return null;

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {tableSelection.selectedRows.length} selected
        </span>
        {/* Add bulk actions here if needed */}
      </div>
    );
  }, [tableSelection.selectedRows.length]);

  // Handle row interactions
  const handleRowClick = useCallback(
    (row: T, index: number) => {
      if (onRowClick) {
        onRowClick(row, index);
      }
    },
    [onRowClick]
  );

  const handleRowDoubleClick = useCallback(
    (row: T, index: number) => {
      if (onRowDoubleClick) {
        onRowDoubleClick(row, index);
      }
    },
    [onRowDoubleClick]
  );

  const handleRowContextMenu = useCallback(
    (row: T, index: number, event: React.MouseEvent) => {
      if (onRowContextMenu) {
        onRowContextMenu(row, index, event);
      }
    },
    [onRowContextMenu]
  );

  // Render functions
  const renderTable = () => {
    if (tableConfig.isLoading) {
      if (loadingRenderer) {
        return loadingRenderer();
      }
      return (
        <TableLoadingState
          message={loading?.loadingMessage}
          type={loading?.spinnerType}
          rowCount={pagination?.pageSize || 5}
          columnCount={visibleColumns.length}
        />
      );
    }

    if (tableConfig.isEmpty) {
      if (emptyRenderer) {
        return emptyRenderer();
      }

      const emptyType = tableData.debouncedSearchQuery
        ? "no-results"
        : Object.values(tableData.filters).some((f) => f)
        ? "filtered"
        : "no-data";

      return (
        <TableEmptyState
          message={emptyState?.message}
          icon={emptyState?.icon}
          action={emptyState?.action}
          type={emptyType}
        />
      );
    }

    return (
      <div
        className={cn(
          "relative overflow-auto",
          maxHeight && "max-h-[var(--max-height)]",
          responsive && "w-full"
        )}
        ref={scrollRef}
        style={{ "--max-height": maxHeight } as React.CSSProperties}
      >
        <table
          className={cn(
            "w-full caption-bottom text-sm",
            bordered && "border border-border",
            compact && "text-xs"
          )}
          role="table"
          aria-label={accessibility?.ariaLabel}
          aria-describedby={accessibility?.ariaDescription}
        >
          <TableHeader
            columns={visibleColumns}
            sortConfig={tableData.sortConfig}
            onSort={tableData.handleSort}
            sortable={sorting?.enabled}
            selectable={tableConfig.hasSelection}
            selectAllChecked={tableSelection.isAllSelected}
            selectAllIndeterminate={
              tableSelection.selectedRows.length > 0 &&
              !tableSelection.isAllSelected
            }
            onSelectAll={tableSelection.handleSelectAll}
            showActions={tableConfig.hasActions}
          />

          <tbody>
            {tableData.processedData.map((row, index) => {
              const isSelected = tableSelection.isRowSelected(row, index);
              const isEditing = tableEditing.isRowEditing(index);

              if (rowRenderer) {
                return rowRenderer(row, index, visibleColumns);
              }

              return (
                <TableRow
                  key={getRowKey ? getRowKey(row, index) : index}
                  row={row}
                  rowIndex={index}
                  columns={visibleColumns}
                  isSelected={isSelected}
                  isEditing={isEditing}
                  editingData={tableEditing.editingRowData}
                  validationErrors={tableEditing.validationErrors}
                  selectable={tableConfig.hasSelection}
                  editable={editing?.enabled}
                  rowActions={rowActions}
                  onRowClick={handleRowClick}
                  onRowDoubleClick={handleRowDoubleClick}
                  onRowContextMenu={handleRowContextMenu}
                  onSelectRow={tableSelection.handleSelectRow}
                  onStartEdit={tableEditing.handleStartEdit}
                  onSaveEdit={tableEditing.handleSaveEdit}
                  onCancelEdit={tableEditing.handleCancelEdit}
                  onFieldChange={tableEditing.handleFieldChange}
                  getRowClassName={getRowClassName}
                  getRowKey={getRowKey}
                  hoverable={hoverable}
                  striped={striped}
                  compact={compact}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full space-y-4",
        size === "sm" && "text-sm",
        size === "lg" && "text-base",
        className
      )}
    >
      {/* Toolbar */}
      <TableToolbar
        searchEnabled={search?.enabled}
        searchQuery={tableData.searchQuery}
        searchPlaceholder={search?.placeholder}
        onSearchChange={tableData.setSearchQuery}
        filteringEnabled={filtering?.enabled}
        columns={visibleColumns}
        filters={tableData.filters}
        onFilterChange={tableData.handleFilterChange}
        maxColumnFilters={filtering?.maxColumnFilters}
        selectedCount={tableSelection.selectedRows.length}
        totalCount={tableData.totalFilteredItems}
        onClearSelection={() => tableSelection.handleSelectionChange([])}
        actions={toolbarActions}
        compact={compact}
      />

      {/* Table */}
      {renderTable()}

      {/* Pagination */}
      {pagination?.enabled &&
        !tableConfig.isLoading &&
        !tableConfig.isEmpty && (
          <TablePagination
            currentPage={tableData.currentPage}
            totalPages={tableData.totalPages}
            pageSize={tableData.pageSize}
            totalItems={pagination.totalItems || tableData.totalFilteredItems}
            startIndex={tableData.startIndex}
            endIndex={tableData.endIndex}
            onPageChange={tableData.handlePageChange}
            onPageSizeChange={tableData.handlePageSizeChange}
            pageSizeOptions={pagination.pageSizeOptions}
            showPageSizeSelector={pagination.showPageSizeSelector}
            showPaginationInfo={pagination.showPaginationInfo}
            compact={compact}
          />
        )}

      {/* Accessibility live region */}
      {accessibility?.ariaLiveRegion && (
        <div
          className="sr-only"
          aria-live={accessibility.ariaLiveRegion}
          aria-atomic="true"
        >
          {/* This will be used for dynamic announcements */}
        </div>
      )}
    </div>
  );
};

DataTable.displayName = "DataTable";

export default memo(DataTable) as typeof DataTable;
export type { DataTableProps } from "./types";
