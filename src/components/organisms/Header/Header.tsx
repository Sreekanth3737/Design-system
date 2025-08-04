import * as React from "react";
import { cn } from "../../../utils/cn";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: "default" | "sticky" | "elevated" | "bordered" | "minimal";
  size?: "sm" | "md" | "lg";
}

export interface HeaderBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  href?: string;
}

export interface HeaderContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface HeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    { className, children, variant = "default", size = "md", ...props },
    ref
  ) => {
    const variants = {
      default: "border-b bg-background",
      sticky:
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      elevated: "border-b bg-background shadow-sm",
      bordered: "border-b-2 border-primary bg-background",
      minimal: "bg-background",
    };

    const sizes = {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    };

    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between w-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);
Header.displayName = "Header";

const HeaderBrand = React.forwardRef<HTMLDivElement, HeaderBrandProps>(
  ({ className, children, href, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "flex items-center space-x-2 font-semibold text-lg",
          href && "hover:opacity-80 transition-opacity cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (href) {
      return (
        <a href={href} className="flex items-center">
          {content}
        </a>
      );
    }

    return content;
  }
);
HeaderBrand.displayName = "HeaderBrand";

const HeaderContent = React.forwardRef<HTMLDivElement, HeaderContentProps>(
  ({ className, children, align = "center", ...props }, ref) => {
    const alignments = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center flex-1", alignments[align], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HeaderContent.displayName = "HeaderContent";

const HeaderActions = React.forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
HeaderActions.displayName = "HeaderActions";

export { Header, HeaderBrand, HeaderContent, HeaderActions };
