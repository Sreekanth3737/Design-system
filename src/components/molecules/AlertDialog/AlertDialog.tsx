import * as React from "react";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/Button";

const alertDialogVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400",
      warning:
        "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-900/10 dark:text-yellow-400",
      success:
        "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-900/10 dark:text-green-400",
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-900/10 dark:text-blue-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertVariant = "default" | "destructive" | "warning" | "success" | "info";

export interface AlertDialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogVariants> {
  title?: string;
  description?: string;
  showIcon?: boolean;
  actions?: React.ReactNode;
  onClose?: () => void;
}

const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      className,
      variant,
      title,
      description,
      showIcon = true,
      actions,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const icons = {
      default: Info,
      destructive: XCircle,
      warning: AlertTriangle,
      success: CheckCircle,
      info: Info,
    } as const;

    const currentVariant: AlertVariant = variant ?? "default";
    const Icon = icons[currentVariant];

    return (
      <div
        ref={ref}
        className={cn(alertDialogVariants({ variant }), className)}
        {...props}
      >
        <div className="flex">
          {showIcon && (
            <div className="mr-3 flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="flex-1">
            {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
            {description && (
              <div className="text-sm opacity-90 mb-3">{description}</div>
            )}
            {children}
            {actions && <div className="mt-4 flex gap-2">{actions}</div>}
          </div>
        </div>
      </div>
    );
  }
);
AlertDialog.displayName = "AlertDialog";

export { AlertDialog, alertDialogVariants };
