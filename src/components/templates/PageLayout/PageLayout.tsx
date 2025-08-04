import * as React from "react";
import { cn } from "../../../utils/cn";

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, header, footer, sidebar, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col", className)}
        {...props}
      >
        {header && <div className="flex-shrink-0">{header}</div>}

        <div className="flex-1 flex">
          {sidebar && (
            <aside className="flex-shrink-0 w-64 border-r bg-background">
              {sidebar}
            </aside>
          )}

          <main className="flex-1 p-6">{children}</main>
        </div>

        {footer && <div className="flex-shrink-0">{footer}</div>}
      </div>
    );
  }
);
PageLayout.displayName = "PageLayout";

export { PageLayout };
