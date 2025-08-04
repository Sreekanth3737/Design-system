import React from "react";
import { cn } from "../../../utils/cn";

// 👉 Root
export interface CardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "outlined" | "elevated";
}
const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card rounded-xl p-4 sm:p-6 flex flex-col gap-3 transition-shadow",
          variant === "outlined" && "border",
          variant === "elevated" && "shadow-md hover:shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);
CardRoot.displayName = "CardRoot";

// 👉 Header
export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  title,
  actions,
  className,
  ...props
}) => {
  if (!icon && !title && !actions) return null;
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="text-primary shrink-0">{icon}</span>}
        {title && <h3 className="font-semibold text-lg truncate">{title}</h3>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};
CardHeader.displayName = "CardHeader";

// 👉 Body
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
}
const CardBody: React.FC<CardBodyProps> = ({
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};
CardBody.displayName = "CardBody";

// 👉 Footer
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...props
}) => {
  if (!children) return null;
  return (
    <div
      className={cn("flex justify-end gap-2 pt-4 border-t", className)}
      {...props}
    >
      {children}
    </div>
  );
};
CardFooter.displayName = "CardFooter";

// 👉 Compound default export
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { Card, CardHeader, CardBody, CardFooter };
