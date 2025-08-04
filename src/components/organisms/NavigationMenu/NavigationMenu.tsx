import * as React from "react";
import { cn } from "../../../utils/cn";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface NavigationMenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  isActive?: boolean;
  variant?: "default" | "ghost" | "underline";
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  isActive?: boolean;
}

const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuItem = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuItemProps
>(
  (
    { className, children, isActive = false, variant = "default", ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          {
            "text-muted-foreground hover:text-foreground":
              !isActive && variant === "default",
            "text-foreground": isActive && variant === "default",
            "text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2":
              variant === "ghost",
            "text-foreground bg-accent text-accent-foreground rounded-md px-3 py-2":
              isActive && variant === "ghost",
            "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-primary pb-1":
              variant === "underline",
            "text-foreground border-b-2 border-primary pb-1":
              isActive && variant === "underline",
          },
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, children, isActive = false, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export { NavigationMenu, NavigationMenuItem, NavigationMenuLink };
