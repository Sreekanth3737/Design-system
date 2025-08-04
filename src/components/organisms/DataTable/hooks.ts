import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Column,
  SortConfig,
  SortDirection,
  SelectionConfig,
  EditingConfig,
  SearchConfig,
  FilterConfig,
  PaginationConfig,
} from "./types";

/**
 * Debounce hook for delaying function execution
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for managing table search functionality
 */
export function useTableSearch<T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  searchConfig?: SearchConfig & {
    enabled?: boolean;
    onSearch?: (query: string) => void;
  }
) {
  const [searchQuery, setSearchQuery] = useState(searchConfig?.query || "");
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    searchConfig?.debounceMs || 300
  );

  // Notify parent of search changes
  useEffect(() => {
    if (searchConfig?.onSearch) {
      searchConfig.onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, searchConfig?.onSearch]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (
      !searchConfig?.enabled ||
      !debouncedSearchQuery ||
      searchConfig.onSearch
    ) {
      return data;
    }

    const searchableColumns = searchConfig.searchableColumns
      ? columns.filter((col) =>
          searchConfig.searchableColumns!.includes(col.key as string)
        )
      : columns;

    return data.filter((row) =>
      searchableColumns.some((column) => {
        const value = row[column.key];
        if (value == null) return false;

        const stringValue = value.toString();
        const queryValue = searchConfig.caseSensitive
          ? debouncedSearchQuery
          : debouncedSearchQuery.toLowerCase();
        const cellValue = searchConfig.caseSensitive
          ? stringValue
          : stringValue.toLowerCase();

        return cellValue.includes(queryValue);
      })
    );
  }, [data, columns, debouncedSearchQuery, searchConfig]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    filteredData,
  };
}

/**
 * Hook for managing table sorting functionality
 */
export function useTableSorting<T extends Record<string, any>>(
  data: T[],
  sortingConfig?: {
    enabled?: boolean;
    defaultSort?: SortConfig<T>;
    onSort?: (config: SortConfig<T>) => void;
    multiSort?: boolean;
  }
) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    sortingConfig?.defaultSort || null
  );

  const handleSort = useCallback(
    (key: keyof T) => {
      if (!sortingConfig?.enabled) return;

      const direction: SortDirection =
        sortConfig?.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc";

      const newSortConfig = { key, direction };

      if (sortingConfig.onSort) {
        sortingConfig.onSort(newSortConfig);
      } else {
        setSortConfig(newSortConfig);
      }
    },
    [sortConfig, sortingConfig]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig || sortingConfig?.onSort) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Handle different data types
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle dates
      const isADate =
        aValue &&
        typeof aValue === "object" &&
        typeof aValue.getTime === "function";
      const isBDate =
        bValue &&
        typeof bValue === "object" &&
        typeof bValue.getTime === "function";

      if (isADate && isBDate) {
        return sortConfig.direction === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Default comparison
      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortConfig.direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortConfig, sortingConfig]);

  return {
    sortConfig,
    setSortConfig,
    handleSort,
    sortedData,
  };
}

/**
 * Hook for managing table filtering functionality
 */
export function useTableFiltering<T extends Record<string, any>>(
  data: T[],
  filteringConfig?: FilterConfig & {
    enabled?: boolean;
    onFilterChange?: (filters: Record<string, any>) => void;
  }
) {
  const [filters, setFilters] = useState<Record<string, any>>(
    filteringConfig?.filters || {}
  );

  const handleFilterChange = useCallback(
    (newFilters: Record<string, any>) => {
      setFilters(newFilters);
      if (filteringConfig?.onFilterChange) {
        filteringConfig.onFilterChange(newFilters);
      }
    },
    [filteringConfig]
  );

  const filteredData = useMemo(() => {
    if (!filteringConfig?.enabled || filteringConfig.onFilterChange) {
      return data;
    }

    return data.filter((row) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue || filterValue === "") return true;

        const rowValue = row[key];
        if (rowValue == null) return false;

        return rowValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters, filteringConfig]);

  return {
    filters,
    setFilters,
    handleFilterChange,
    filteredData,
  };
}

/**
 * Hook for managing table pagination functionality
 */
export function useTablePagination<T extends Record<string, any>>(
  data: T[],
  paginationConfig?: PaginationConfig & {
    enabled?: boolean;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
  }
) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(
    paginationConfig?.pageSize || 10
  );

  const currentPage = paginationConfig?.currentPage || internalCurrentPage;
  const pageSize = paginationConfig?.pageSize || internalPageSize;

  const handlePageChange = useCallback(
    (page: number) => {
      if (paginationConfig?.onPageChange) {
        paginationConfig.onPageChange(page);
      } else {
        setInternalCurrentPage(page);
      }
    },
    [paginationConfig]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (paginationConfig?.onPageSizeChange) {
        paginationConfig.onPageSizeChange(newPageSize);
      } else {
        setInternalPageSize(newPageSize);
        setInternalCurrentPage(1); // Reset to first page when changing page size
      }
    },
    [paginationConfig]
  );

  const paginatedData = useMemo(() => {
    if (!paginationConfig?.enabled) return data;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize, paginationConfig?.enabled]);

  const totalPages = Math.ceil(
    (paginationConfig?.totalItems || data.length) / pageSize
  );
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(
    currentPage * pageSize,
    paginationConfig?.totalItems || data.length
  );

  return {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    handlePageChange,
    handlePageSizeChange,
  };
}

/**
 * Hook for managing table row selection
 */
export function useTableSelection<T extends Record<string, any>>(
  data: T[],
  selectionConfig?: SelectionConfig<T> & {
    enabled?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
  }
) {
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>([]);

  const selectedRows = selectionConfig?.selectedRows || internalSelectedRows;
  const getRowKey =
    selectionConfig?.getRowKey || ((row: T, index: number) => index);

  const handleSelectionChange = useCallback(
    (newSelectedRows: T[]) => {
      if (selectionConfig?.onSelectionChange) {
        selectionConfig.onSelectionChange(newSelectedRows);
      } else {
        setInternalSelectedRows(newSelectedRows);
      }
    },
    [selectionConfig]
  );

  const handleSelectAll = useCallback(() => {
    if (!selectionConfig?.enabled) return;

    const selectableRows = data.filter((row, index) =>
      selectionConfig.isRowSelectable
        ? selectionConfig.isRowSelectable(row, index)
        : true
    );

    const allSelected =
      selectableRows.length > 0 &&
      selectableRows.every((row) =>
        selectedRows.some(
          (selected) => getRowKey(row, 0) === getRowKey(selected, 0)
        )
      );

    if (allSelected) {
      handleSelectionChange([]);
    } else {
      if (selectionConfig.mode === "single") {
        handleSelectionChange(selectableRows.slice(0, 1));
      } else {
        handleSelectionChange(selectableRows);
      }
    }
  }, [data, selectedRows, selectionConfig, getRowKey, handleSelectionChange]);

  const handleSelectRow = useCallback(
    (row: T, index: number) => {
      if (!selectionConfig?.enabled) return;

      if (
        selectionConfig.isRowSelectable &&
        !selectionConfig.isRowSelectable(row, index)
      ) {
        return;
      }

      const rowKey = getRowKey(row, index);
      const isSelected = selectedRows.some(
        (selected) => getRowKey(selected, 0) === rowKey
      );

      if (selectionConfig.mode === "single") {
        if (isSelected) {
          handleSelectionChange([]);
        } else {
          handleSelectionChange([row]);
        }
      } else {
        if (isSelected) {
          handleSelectionChange(
            selectedRows.filter((selected) => getRowKey(selected, 0) !== rowKey)
          );
        } else {
          handleSelectionChange([...selectedRows, row]);
        }
      }
    },
    [selectedRows, selectionConfig, getRowKey, handleSelectionChange]
  );

  const isRowSelected = useCallback(
    (row: T, index: number) => {
      const rowKey = getRowKey(row, index);
      return selectedRows.some((selected) => getRowKey(selected, 0) === rowKey);
    },
    [selectedRows, getRowKey]
  );

  const isAllSelected = useMemo(() => {
    if (!selectionConfig?.enabled || data.length === 0) return false;

    const selectableRows = data.filter((row, index) =>
      selectionConfig.isRowSelectable
        ? selectionConfig.isRowSelectable(row, index)
        : true
    );

    return (
      selectableRows.length > 0 &&
      selectableRows.every((row) =>
        selectedRows.some(
          (selected) => getRowKey(row, 0) === getRowKey(selected, 0)
        )
      )
    );
  }, [data, selectedRows, selectionConfig, getRowKey]);

  return {
    selectedRows,
    handleSelectionChange,
    handleSelectAll,
    handleSelectRow,
    isRowSelected,
    isAllSelected,
  };
}

/**
 * Hook for managing table inline editing
 */
export function useTableEditing<T extends Record<string, any>>(
  editingConfig?: EditingConfig<T> & {
    enabled?: boolean;
    onRowUpdate?: (row: T, index: number) => void;
    onEditStart?: (row: T, index: number) => void;
    onEditCancel?: (row: T, index: number) => void;
  }
) {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editingRowData, setEditingRowData] = useState<T | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleStartEdit = useCallback(
    (row: T, index: number) => {
      if (!editingConfig?.enabled) return;

      setEditingRowIndex(index);
      setEditingRowData({ ...row });
      setValidationErrors({});

      if (editingConfig.onEditStart) {
        editingConfig.onEditStart(row, index);
      }
    },
    [editingConfig]
  );

  const handleCancelEdit = useCallback(() => {
    if (
      editingRowIndex !== null &&
      editingRowData &&
      editingConfig?.onEditCancel
    ) {
      editingConfig.onEditCancel(editingRowData, editingRowIndex);
    }

    setEditingRowIndex(null);
    setEditingRowData(null);
    setValidationErrors({});
  }, [editingRowIndex, editingRowData, editingConfig]);

  const handleSaveEdit = useCallback(() => {
    if (
      editingRowIndex === null ||
      !editingRowData ||
      !editingConfig?.onRowUpdate
    ) {
      return;
    }

    // Validate if validation function is provided
    if (editingConfig.validate) {
      const errors = editingConfig.validate(editingRowData);
      if (errors && Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }

    editingConfig.onRowUpdate(editingRowData, editingRowIndex);
    setEditingRowIndex(null);
    setEditingRowData(null);
    setValidationErrors({});
  }, [editingRowIndex, editingRowData, editingConfig, validationErrors]);

  const handleFieldChange = useCallback(
    (key: keyof T, value: any) => {
      if (!editingRowData) return;

      const newData = { ...editingRowData, [key]: value };
      setEditingRowData(newData);

      // Clear validation error for this field
      if (validationErrors[key as string]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[key as string];
          return newErrors;
        });
      }
    },
    [editingRowData, validationErrors]
  );

  const isRowEditing = useCallback(
    (index: number) => {
      return editingRowIndex === index;
    },
    [editingRowIndex]
  );

  return {
    editingRowIndex,
    editingRowData,
    validationErrors,
    isRowEditing,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleFieldChange,
  };
}

/**
 * Hook for managing table data processing pipeline
 */
export function useTableData<T extends Record<string, any>>(
  data: T[],
  columns: Column<T>[],
  options?: {
    search?: SearchConfig & {
      enabled?: boolean;
      onSearch?: (query: string) => void;
    };
    sorting?: {
      enabled?: boolean;
      defaultSort?: SortConfig<T>;
      onSort?: (config: SortConfig<T>) => void;
    };
    filtering?: FilterConfig & {
      enabled?: boolean;
      onFilterChange?: (filters: Record<string, any>) => void;
    };
    pagination?: PaginationConfig & {
      enabled?: boolean;
      onPageChange?: (page: number) => void;
      onPageSizeChange?: (pageSize: number) => void;
    };
  }
) {
  // Apply hooks in the correct order
  const searchResult = useTableSearch(data, columns, options?.search);
  const sortingResult = useTableSorting(
    searchResult.filteredData,
    options?.sorting
  );
  const filteringResult = useTableFiltering(
    sortingResult.sortedData,
    options?.filtering
  );
  const paginationResult = useTablePagination(
    filteringResult.filteredData,
    options?.pagination
  );

  return {
    // Search
    searchQuery: searchResult.searchQuery,
    setSearchQuery: searchResult.setSearchQuery,
    debouncedSearchQuery: searchResult.debouncedSearchQuery,

    // Sorting
    sortConfig: sortingResult.sortConfig,
    setSortConfig: sortingResult.setSortConfig,
    handleSort: sortingResult.handleSort,

    // Filtering
    filters: filteringResult.filters,
    setFilters: filteringResult.setFilters,
    handleFilterChange: filteringResult.handleFilterChange,

    // Pagination
    currentPage: paginationResult.currentPage,
    pageSize: paginationResult.pageSize,
    totalPages: paginationResult.totalPages,
    startIndex: paginationResult.startIndex,
    endIndex: paginationResult.endIndex,
    handlePageChange: paginationResult.handlePageChange,
    handlePageSizeChange: paginationResult.handlePageSizeChange,

    // Final processed data
    processedData: paginationResult.paginatedData,
    totalFilteredItems: filteringResult.filteredData.length,
  };
}

/**
 * Hook for managing scroll position preservation
 */
export function useScrollPosition(preserveScrollPosition?: boolean) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });

  const saveScrollPosition = useCallback(() => {
    if (scrollRef.current && preserveScrollPosition) {
      setScrollPosition({
        top: scrollRef.current.scrollTop,
        left: scrollRef.current.scrollLeft,
      });
    }
  }, [preserveScrollPosition]);

  const restoreScrollPosition = useCallback(() => {
    if (scrollRef.current && preserveScrollPosition) {
      scrollRef.current.scrollTop = scrollPosition.top;
      scrollRef.current.scrollLeft = scrollPosition.left;
    }
  }, [preserveScrollPosition, scrollPosition]);

  useEffect(() => {
    if (preserveScrollPosition) {
      restoreScrollPosition();
    }
  }, [restoreScrollPosition, preserveScrollPosition]);

  return {
    scrollRef,
    saveScrollPosition,
    restoreScrollPosition,
  };
}
