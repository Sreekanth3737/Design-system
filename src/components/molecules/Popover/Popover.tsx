import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const Popover = PopoverPrimitive.Root;

// Add hover trigger support
interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {
  /**
   * Whether to show the popover on hover
   */
  showOnHover?: boolean;
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ showOnHover, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const hoverTimeout = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  if (!showOnHover) {
    return <PopoverPrimitive.Trigger ref={ref} {...props} />;
  }

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      {...props}
      onMouseEnter={() => {
        if (hoverTimeout.current) {
          clearTimeout(hoverTimeout.current);
        }
        setOpen(true);
      }}
      onMouseLeave={() => {
        hoverTimeout.current = setTimeout(() => {
          setOpen(false);
        }, 150);
      }}
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
    />
  );
});
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

// Define animation and size variants
const popoverVariants = cva(
  "z-50 rounded-md border bg-white p-4 shadow-md outline-none",
  {
    variants: {
      animation: {
        none: "",
        fade: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        zoom: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        slide:
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      },
      size: {
        auto: "",
        sm: "w-48",
        md: "w-64",
        lg: "w-80",
        xl: "w-96",
      },
    },
    defaultVariants: {
      animation: "fade",
      size: "auto",
    },
  }
);

const arrowVariants = cva("fill-current", {
  variants: {
    color: {
      white: "fill-white",
      primary: "fill-primary",
      secondary: "fill-secondary",
    },
    size: {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
  },
});

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverVariants> {
  /**
   * Arrow customization
   */
  arrow?: {
    color?: "white" | "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    hide?: boolean;
  };
  /**
   * Whether to enable collision handling
   * @default true
   */
  handleCollisions?: boolean;
  /**
   * Custom positioning
   */
  position?: {
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
  };
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      arrow,
      animation,
      size,
      handleCollisions = true,
      position,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={position?.align || align}
        sideOffset={position?.sideOffset || sideOffset}
        alignOffset={position?.alignOffset || 0}
        side={position?.side}
        className={cn(popoverVariants({ animation, size }), className)}
        collisionPadding={handleCollisions ? 8 : undefined}
        collisionBoundary={handleCollisions ? document.body : undefined}
        {...props}
      >
        {!arrow?.hide && (
          <PopoverPrimitive.Arrow
            className={cn(
              arrowVariants({
                color: arrow?.color,
                size: arrow?.size,
              })
            )}
          />
        )}
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
