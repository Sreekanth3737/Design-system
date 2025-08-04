import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Input, InputProps } from "../../atoms/Input";
import { Button } from "../../atoms/Button";

export interface SearchBoxProps extends Omit<InputProps, "type"> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, onSearch, onClear, showClearButton = true, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      props.onChange?.(e);
    };

    const handleSearch = () => {
      onSearch?.(value as string);
    };

    const handleClear = () => {
      setValue("");
      onClear?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
      props.onKeyDown?.(e);
    };

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          className={cn(
            "pl-10",
            showClearButton && value && "pr-10",
            className
          )}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {showClearButton && value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);
SearchBox.displayName = "SearchBox";

export { SearchBox };
