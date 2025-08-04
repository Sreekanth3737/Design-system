import React, { memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "../../../../utils/cn";
import { Button } from "../../../atoms/Button";
import { Select } from "../../../atoms/Select";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showPaginationInfo?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
  compact?: boolean;
  disabled?: boolean;
}

const TablePagination = memo(
  ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    startIndex,
    endIndex,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    showPageSizeSelector = true,
    showPaginationInfo = true,
    showFirstLast = true,
    maxVisiblePages = 5,
    className,
    compact = false,
    disabled = false,
  }: TablePaginationProps) => {
    // Don't render if there's only one page and no items
    if (totalPages <= 1 && totalItems === 0) {
      return null;
    }

    // Calculate visible page numbers
    const getVisiblePageNumbers = () => {
      const pages: number[] = [];

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than or equal to max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate range around current page
        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }

      return pages;
    };

    const visiblePages = getVisiblePageNumbers();
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageSizeChange = (newPageSize: string) => {
      if (onPageSizeChange) {
        onPageSizeChange(parseInt(newPageSize));
      }
    };

    return (
      <div
        className={cn(
          "flex items-center justify-between",
          compact && "gap-2",
          !compact && "gap-4",
          className
        )}
      >
        {/* Left side: Pagination info and page size selector */}
        <div className="flex items-center gap-4">
          {/* Pagination info */}
          {showPaginationInfo && (
            <div className="text-sm text-muted-foreground">
              {totalItems === 0 ? (
                "No items"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {startIndex.toLocaleString()}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">
                    {endIndex.toLocaleString()}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalItems.toLocaleString()}
                  </span>{" "}
                  entries
                </>
              )}
            </div>
          )}

          {/* Page size selector */}
          {showPageSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Show
              </span>
              <Select
                value={pageSize.toString()}
                onChange={handlePageSizeChange}
                options={pageSizeOptions.map((size) => ({
                  label: size.toString(),
                  value: size.toString(),
                }))}
                className="w-20"
                disabled={disabled}
                aria-label="Items per page"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                per page
              </span>
            </div>
          )}
        </div>

        {/* Right side: Page navigation */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* First page button */}
            {showFirstLast && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={isFirstPage || disabled}
                aria-label="Go to first page"
                className={cn(compact && "h-8 w-8 p-0")}
              >
                {compact ? (
                  <ChevronsLeft className="w-4 h-4" />
                ) : (
                  <>
                    <ChevronsLeft className="w-4 h-4 mr-1" />
                    First
                  </>
                )}
              </Button>
            )}

            {/* Previous page button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={isFirstPage || disabled}
              aria-label="Go to previous page"
              className={cn(compact && "h-8 w-8 p-0")}
            >
              {compact ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </>
              )}
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {visiblePages.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  disabled={disabled}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className="w-10 h-8"
                >
                  {page}
                </Button>
              ))}
            </div>

            {/* Next page button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={isLastPage || disabled}
              aria-label="Go to next page"
              className={cn(compact && "h-8 w-8 p-0")}
            >
              {compact ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>

            {/* Last page button */}
            {showFirstLast && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(totalPages)}
                disabled={isLastPage || disabled}
                aria-label="Go to last page"
                className={cn(compact && "h-8 w-8 p-0")}
              >
                {compact ? (
                  <ChevronsRight className="w-4 h-4" />
                ) : (
                  <>
                    Last
                    <ChevronsRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";

export default TablePagination;
