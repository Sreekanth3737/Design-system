import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  colors: string[];
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showSelectedIcon?: boolean;
  allowCustomColor?: boolean;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      onChange,
      colors,
      className,
      disabled = false,
      size = "md",
      showSelectedIcon = true,
      allowCustomColor = false,
      ...props
    },
    ref
  ) => {
    const [customColor, setCustomColor] = React.useState("");

    const handleColorSelect = (color: string) => {
      if (!disabled) {
        onChange?.(color);
      }
    };

    const handleCustomColorChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const color = e.target.value;
      setCustomColor(color);
      onChange?.(color);
    };

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {/* Predefined Colors */}
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                sizeClasses[size],
                "rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                value === color
                  ? "border-gray-800 ring-2 ring-blue-500 ring-offset-2"
                  : "border-gray-300 hover:border-gray-400",
                disabled && "cursor-not-allowed opacity-50"
              )}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              disabled={disabled}
              aria-label={`Select color ${color}`}
            >
              {showSelectedIcon && value === color && (
                <Check className="w-full h-full text-white drop-shadow-lg" />
              )}
            </button>
          ))}
        </div>

        {/* Custom Color Input */}
        {allowCustomColor && (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor || value || "#000000"}
              onChange={handleCustomColorChange}
              disabled={disabled}
              className={cn(
                "w-10 h-8 rounded border border-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              )}
            />
            <span className="text-sm text-gray-600">
              Custom color: {value || "#000000"}
            </span>
          </div>
        )}

        {/* Selected Color Display */}
        {value && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: value }}
            />
            <span>Selected: {value}</span>
          </div>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
