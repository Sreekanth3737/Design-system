import * as React from "react";
import { X, Plus } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxTags?: number;
  allowDuplicates?: boolean;
  tagValidator?: (tag: string) => boolean | string;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = "Add tag...",
      className,
      disabled = false,
      maxTags,
      allowDuplicates = false,
      tagValidator,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [error, setError] = React.useState<string>("");

    const validateTag = (tag: string): boolean => {
      setError("");

      if (!tag.trim()) {
        setError("Tag cannot be empty");
        return false;
      }

      if (!allowDuplicates && value.includes(tag)) {
        setError("Tag already exists");
        return false;
      }

      if (maxTags && value.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`);
        return false;
      }

      if (tagValidator) {
        const validation = tagValidator(tag);
        if (typeof validation === "string") {
          setError(validation);
          return false;
        }
        if (!validation) {
          setError("Invalid tag");
          return false;
        }
      }

      return true;
    };

    const addTag = (tag: string) => {
      const trimmedTag = tag.trim();
      if (validateTag(trimmedTag)) {
        onChange?.([...value, trimmedTag]);
        setInputValue("");
        setError("");
      }
    };

    const removeTag = (indexToRemove: number) => {
      onChange?.(value.filter((_, index) => index !== indexToRemove));
      setError("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeTag(value.length - 1);
      }
    };

    const handleAddClick = () => {
      addTag(inputValue);
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Tags Display */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                <span>{tag}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-1 hover:text-red-500 transition-colors"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        )}

        {/* Input Row */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || (maxTags ? value.length >= maxTags : false)}
            className={cn(error && "border-red-500")}
          />
          <Button
            type="button"
            onClick={handleAddClick}
            disabled={
              !inputValue.trim() ||
              disabled ||
              (maxTags ? value.length >= maxTags : false)
            }
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Tag Count */}
        {maxTags && (
          <p className="text-xs text-muted-foreground">
            {value.length}/{maxTags} tags
          </p>
        )}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput };
