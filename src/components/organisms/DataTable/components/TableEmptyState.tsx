import React, { memo } from "react";
import { Database, Search, Filter } from "lucide-react";
import { cn } from "../../../../utils/cn";
import { Button } from "../../../atoms/Button";

interface TableEmptyStateProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  type?: "no-data" | "no-results" | "filtered";
  className?: string;
}

const TableEmptyState = memo(
  ({
    message,
    description,
    icon,
    action,
    type = "no-data",
    className,
  }: TableEmptyStateProps) => {
    // Default content based on type
    const getDefaultContent = () => {
      switch (type) {
        case "no-results":
          return {
            message: "No results found",
            description:
              "Try adjusting your search to find what you're looking for.",
            icon: <Search className="w-12 h-12 text-muted-foreground" />,
          };
        case "filtered":
          return {
            message: "No matching items",
            description:
              "No items match your current filters. Try adjusting or clearing your filters.",
            icon: <Filter className="w-12 h-12 text-muted-foreground" />,
          };
        case "no-data":
        default:
          return {
            message: "No data available",
            description: "There are no items to display at the moment.",
            icon: <Database className="w-12 h-12 text-muted-foreground" />,
          };
      }
    };

    const defaultContent = getDefaultContent();
    const displayMessage = message || defaultContent.message;
    const displayDescription = description || defaultContent.description;
    const displayIcon = icon || defaultContent.icon;

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-16 px-8 text-center",
          className
        )}
      >
        {/* Icon */}
        <div className="mb-4" aria-hidden="true">
          {displayIcon}
        </div>

        {/* Message */}
        <h3 className="text-lg font-medium text-foreground mb-2">
          {displayMessage}
        </h3>

        {/* Description */}
        {displayDescription && (
          <p className="text-muted-foreground mb-6 max-w-sm">
            {displayDescription}
          </p>
        )}

        {/* Action button */}
        {action && (
          <Button
            onClick={action.onClick}
            variant="outline"
            className="min-w-32"
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

TableEmptyState.displayName = "TableEmptyState";

export default TableEmptyState;
