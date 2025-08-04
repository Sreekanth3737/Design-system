import * as React from "react";
import { cn } from "../../../utils/cn";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "flex items-center justify-center px-4 py-6 border-t bg-background text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </footer>
    );
  }
);
Footer.displayName = "Footer";

export { Footer };
