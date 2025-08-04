import { ReactNode } from "react";

/**
 * Represents a sortable direction
 */
export type SortDirection = "asc" | "desc";

/**
 * Represents the current sort configuration
 */
export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

/**
 * Supported column data types for editing
 */
export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "boolean"
  | "email"
  | "url";

/**
 * Selection option for select-type columns
 */
export interface ColumnSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Column alignment options
 */
export type ColumnAlignment = "left" | "center" | "right";

/**
 * Column configuration with improved type safety
 */
export interface Column<T extends Record<string, any>> {
  /** Unique identifier for the column */
  key: keyof T;
  /** Display header text */
  header: string;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Whether the column supports inline editing */
  editable?: boolean;
  /** Data type for validation and input rendering */
  type?: ColumnType;
  /** Options for select-type columns */
  options?: ColumnSelectOption[];
  /** Custom cell renderer */
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Text alignment */
  align?: ColumnAlignment;
  /** Whether the column is hidden */
  hidden?: boolean;
  /** Minimum width for responsive behavior */
  minWidth?: string;
  /** Whether the column is resizable */
  resizable?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Custom header renderer */
  headerRender?: (column: Column<T>) => ReactNode;
  /** Column description for tooltips */
  description?: string;
}

/**
 * Pagination configuration
 */
export interface PaginationConfig {
  /** Current page number (1-based) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  totalItems: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Whether to show page size selector */
  showPageSizeSelector?: boolean;
  /** Whether to show pagination info */
  showPaginationInfo?: boolean;
}

/**
 * Search configuration
 */
export interface SearchConfig {
  /** Search query string */
  query: string;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Whether search is case sensitive */
  caseSensitive?: boolean;
  /** Columns to search in (if not provided, searches all) */
  searchableColumns?: string[];
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  /** Current filter values */
  filters: Record<string, any>;
  /** Available filter options per column */
  filterOptions?: Record<string, ColumnSelectOption[]>;
  /** Whether to show column filters */
  showColumnFilters?: boolean;
  /** Maximum number of column filters to show */
  maxColumnFilters?: number;
}

/**
 * Loading state configuration
 */
export interface LoadingConfig {
  /** Whether data is loading */
  isLoading: boolean;
  /** Custom loading message */
  loadingMessage?: string;
  /** Loading spinner type */
  spinnerType?: "default" | "dots" | "bars";
}

/**
 * Empty state configuration
 */
export interface EmptyStateConfig {
  /** Message to show when no data */
  message: string;
  /** Optional icon to show */
  icon?: ReactNode;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Row selection configuration
 */
export interface SelectionConfig<T> {
  /** Currently selected rows */
  selectedRows: T[];
  /** Selection mode */
  mode: "single" | "multiple";
  /** Whether to show select all checkbox */
  showSelectAll?: boolean;
  /** Custom row selection predicate */
  isRowSelectable?: (row: T, index: number) => boolean;
  /** Selection key extractor for performance */
  getRowKey?: (row: T, index: number) => string | number;
}

/**
 * Inline editing configuration
 */
export interface EditingConfig<T> {
  /** Currently editing row index */
  editingRowIndex: number | null;
  /** Editing row data */
  editingRowData: T | null;
  /** Whether to enable inline editing */
  enabled: boolean;
  /** Whether to show save/cancel buttons */
  showActions?: boolean;
  /** Custom validation function */
  validate?: (data: T) => Record<string, string> | null;
}

/**
 * Row action configuration
 */
export interface RowAction<T> {
  /** Unique identifier */
  key: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: ReactNode;
  /** Action handler */
  onClick: (row: T, index: number) => void;
  /** Whether action is disabled */
  disabled?: boolean | ((row: T, index: number) => boolean);
  /** Action variant */
  variant?: "default" | "destructive" | "secondary";
  /** Whether to show in dropdown menu */
  showInDropdown?: boolean;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  /** Table aria-label */
  ariaLabel?: string;
  /** Table description */
  ariaDescription?: string;
  /** Whether to announce sort changes */
  announceSortChanges?: boolean;
  /** Whether to announce filter changes */
  announceFilterChanges?: boolean;
  /** Custom aria-live region for announcements */
  ariaLiveRegion?: "polite" | "assertive";
}

/**
 * Main DataTable props with improved organization
 */
export interface DataTableProps<T extends Record<string, any>> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Custom CSS classes */
  className?: string;

  // Core Features
  /** Sorting configuration */
  sorting?: {
    enabled?: boolean;
    defaultSort?: SortConfig<T>;
    onSort?: (config: SortConfig<T>) => void;
    multiSort?: boolean;
  };

  /** Search configuration */
  search?: SearchConfig & {
    enabled?: boolean;
    onSearch?: (query: string) => void;
  };

  /** Pagination configuration */
  pagination?: PaginationConfig & {
    enabled?: boolean;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  };

  /** Selection configuration */
  selection?: SelectionConfig<T> & {
    enabled?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
  };

  /** Filtering configuration */
  filtering?: FilterConfig & {
    enabled?: boolean;
    onFilterChange?: (filters: Record<string, any>) => void;
  };

  /** Inline editing configuration */
  editing?: EditingConfig<T> & {
    enabled?: boolean;
    onRowUpdate?: (row: T, index: number) => void;
    onEditStart?: (row: T, index: number) => void;
    onEditCancel?: (row: T, index: number) => void;
  };

  // UI Configuration
  /** Loading state */
  loading?: LoadingConfig;

  /** Empty state */
  emptyState?: EmptyStateConfig;

  /** Row actions */
  rowActions?: RowAction<T>[];

  /** Accessibility configuration */
  accessibility?: AccessibilityConfig;

  // Layout & Styling
  /** Whether table is compact */
  compact?: boolean;

  /** Whether to show table borders */
  bordered?: boolean;

  /** Whether to show row hover effects */
  hoverable?: boolean;

  /** Whether to show striped rows */
  striped?: boolean;

  /** Table size variant */
  size?: "sm" | "md" | "lg";

  /** Whether table should be responsive */
  responsive?: boolean;

  /** Maximum table height (for scrolling) */
  maxHeight?: string;

  /** Whether to enable virtual scrolling */
  virtual?: boolean;

  /** Virtual row height (when virtual=true) */
  virtualRowHeight?: number;

  // Advanced Features
  /** Custom row renderer */
  rowRenderer?: (row: T, index: number, columns: Column<T>[]) => ReactNode;

  /** Custom empty state renderer */
  emptyRenderer?: () => ReactNode;

  /** Custom loading renderer */
  loadingRenderer?: () => ReactNode;

  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;

  /** Row double click handler */
  onRowDoubleClick?: (row: T, index: number) => void;

  /** Row context menu handler */
  onRowContextMenu?: (row: T, index: number, event: React.MouseEvent) => void;

  /** Custom row key extractor */
  getRowKey?: (row: T, index: number) => string | number;

  /** Custom row CSS class generator */
  getRowClassName?: (row: T, index: number) => string;

  /** Whether to preserve scroll position on data changes */
  preserveScrollPosition?: boolean;
}
