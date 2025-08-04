import React, { memo } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../../../utils/cn";

interface TableLoadingStateProps {
  message?: string;
  type?: "default" | "dots" | "bars" | "skeleton";
  rowCount?: number;
  columnCount?: number;
  className?: string;
}

const DotsSpinner = memo(() => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
        style={{
          animationDelay: `${i * 0.2}s`,
          animationDuration: "1s",
        }}
      />
    ))}
  </div>
));

const BarsSpinner = memo(() => (
  <div className="flex space-x-1">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-1 bg-blue-500 animate-pulse"
        style={{
          height: Math.random() * 20 + 10,
          animationDelay: `${i * 0.1}s`,
          animationDuration: "1.2s",
        }}
      />
    ))}
  </div>
));

const SkeletonRow = memo(({ columnCount }: { columnCount: number }) => (
  <tr className="border-t">
    {Array.from({ length: columnCount }, (_, i) => (
      <td key={i} className="p-4">
        <div
          className="h-4 bg-muted rounded animate-pulse"
          style={{
            width: `${Math.random() * 40 + 60}%`,
          }}
        />
      </td>
    ))}
  </tr>
));

const SkeletonTable = memo(
  ({ rowCount, columnCount }: { rowCount: number; columnCount: number }) => (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {Array.from({ length: columnCount }, (_, i) => (
              <th key={i} className="p-4">
                <div className="h-4 bg-muted-foreground/20 rounded animate-pulse w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }, (_, i) => (
            <SkeletonRow key={i} columnCount={columnCount} />
          ))}
        </tbody>
      </table>
    </div>
  )
);

const TableLoadingState = memo(
  ({
    message = "Loading...",
    type = "default",
    rowCount = 5,
    columnCount = 4,
    className,
  }: TableLoadingStateProps) => {
    const renderSpinner = () => {
      switch (type) {
        case "dots":
          return <DotsSpinner />;
        case "bars":
          return <BarsSpinner />;
        case "skeleton":
          return (
            <SkeletonTable rowCount={rowCount} columnCount={columnCount} />
          );
        case "default":
        default:
          return <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />;
      }
    };

    if (type === "skeleton") {
      return <div className={className}>{renderSpinner()}</div>;
    }

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-16 px-8 text-center",
          className
        )}
      >
        {/* Spinner */}
        <div className="mb-4" aria-hidden="true">
          {renderSpinner()}
        </div>

        {/* Loading message */}
        <p className="text-muted-foreground" role="status" aria-live="polite">
          {message}
        </p>

        {/* Screen reader only text */}
        <span className="sr-only">Loading table data, please wait...</span>
      </div>
    );
  }
);

TableLoadingState.displayName = "TableLoadingState";

export default TableLoadingState;
