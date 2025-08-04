import * as React from "react";
import { cn } from "../../../utils/cn";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface DashboardLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;

  // Layout configuration
  sidebarWidth?: number | string;
  collapsedSidebarWidth?: number | string;
  headerHeight?: number | string;
  footerHeight?: number | string;

  // Responsive behavior
  collapsibleSidebar?: boolean;
  defaultSidebarCollapsed?: boolean;
  hideSidebarOnMobile?: boolean;
  breakpoint?: "sm" | "md" | "lg" | "xl";

  // Layout variants
  variant?: "default" | "fixed-header" | "minimal" | "full-height" | "centered";

  // Content spacing
  contentPadding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  // Sidebar position and behavior
  sidebarPosition?: "left" | "right";
  sidebarBehavior?: "push" | "overlay" | "off-canvas";

  // Visual enhancements
  showSidebarToggleInHeader?: boolean;
  enableSidebarResize?: boolean;
  sidebarAnimation?: "slide" | "fade" | "scale" | "none";
  showBreadcrumbs?: boolean;
  breadcrumbs?: React.ReactNode;

  // Loading states
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  loadingOverlay?: boolean;

  // Theme and styling
  theme?: "light" | "dark" | "system";
  glassEffect?: boolean;
  sidebarBlur?: boolean;

  // Advanced features
  persistSidebarState?: boolean;
  autoCollapseBelowBreakpoint?: boolean;
  sidebarResizable?: boolean;
  maxSidebarWidth?: number;
  minSidebarWidth?: number;

  // Event handlers
  onSidebarToggle?: (collapsed: boolean) => void;
  onSidebarCollapse?: () => void;
  onSidebarExpand?: () => void;
  onSidebarResize?: (width: number) => void;
  onLayoutChange?: (layout: {
    sidebarCollapsed: boolean;
    isMobile: boolean;
  }) => void;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      className,
      children,
      header,
      sidebar,
      footer,
      sidebarWidth = 280,
      collapsedSidebarWidth = 64,
      headerHeight = "auto",
      footerHeight = "auto",
      collapsibleSidebar = false,
      defaultSidebarCollapsed = false,
      hideSidebarOnMobile = true,
      breakpoint = "lg",
      variant = "default",
      contentPadding = "md",
      sidebarPosition = "left",
      sidebarBehavior = "push",
      showSidebarToggleInHeader = true,
      enableSidebarResize = false,
      sidebarAnimation = "slide",
      showBreadcrumbs = false,
      breadcrumbs,
      loading = false,
      loadingComponent,
      loadingOverlay = false,
      theme = "system",
      glassEffect = false,
      sidebarBlur = false,
      persistSidebarState = false,
      autoCollapseBelowBreakpoint = false,
      sidebarResizable = false,
      maxSidebarWidth = 400,
      minSidebarWidth = 200,
      onSidebarToggle,
      onSidebarCollapse,
      onSidebarExpand,
      onSidebarResize,
      onLayoutChange,
      ...props
    },
    ref
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(
      defaultSidebarCollapsed
    );
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [currentSidebarWidth, setCurrentSidebarWidth] = React.useState(
      typeof sidebarWidth === "number"
        ? sidebarWidth
        : parseInt(sidebarWidth as string)
    );

    const sidebarRef = React.useRef<HTMLDivElement>(null);

    // Load persisted sidebar state
    React.useEffect(() => {
      if (persistSidebarState) {
        const saved = localStorage.getItem("dashboard-sidebar-collapsed");
        if (saved !== null) {
          setSidebarCollapsed(JSON.parse(saved));
        }
      }
    }, [persistSidebarState]);

    // Responsive breakpoint handling
    React.useEffect(() => {
      const checkMobile = () => {
        const breakpoints = {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        };
        const mobile = window.innerWidth < breakpoints[breakpoint];
        setIsMobile(mobile);

        // Auto-collapse on mobile if enabled
        if (autoCollapseBelowBreakpoint && mobile && !sidebarCollapsed) {
          setSidebarCollapsed(true);
        }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint, autoCollapseBelowBreakpoint, sidebarCollapsed]);

    // Notify layout changes
    React.useEffect(() => {
      onLayoutChange?.({ sidebarCollapsed, isMobile });
    }, [sidebarCollapsed, isMobile, onLayoutChange]);

    const handleSidebarToggle = React.useCallback(() => {
      if (isMobile) {
        setSidebarOpen((prev) => !prev);
      } else {
        setSidebarCollapsed((prev) => {
          const newState = !prev;
          onSidebarToggle?.(newState);
          if (newState) {
            onSidebarCollapse?.();
          } else {
            onSidebarExpand?.();
          }

          // Persist state
          if (persistSidebarState) {
            localStorage.setItem(
              "dashboard-sidebar-collapsed",
              JSON.stringify(newState)
            );
          }

          // Dispatch custom event for child components
          window.dispatchEvent(
            new CustomEvent("dashboard-sidebar-toggle", {
              detail: { collapsed: newState },
            })
          );

          return newState;
        });
      }
    }, [
      isMobile,
      onSidebarToggle,
      onSidebarCollapse,
      onSidebarExpand,
      persistSidebarState,
    ]);

    const closeMobileSidebar = React.useCallback(() => {
      if (isMobile) {
        setSidebarOpen(false);
      }
    }, [isMobile]);

    // Sidebar resize functionality
    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (!sidebarResizable || sidebarCollapsed) return;
        e.preventDefault();
        setIsResizing(true);
      },
      [sidebarResizable, sidebarCollapsed]
    );

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing || !sidebarRef.current) return;

        const rect = sidebarRef.current.getBoundingClientRect();
        const newWidth =
          sidebarPosition === "left"
            ? e.clientX - rect.left
            : rect.right - e.clientX;

        const clampedWidth = Math.max(
          minSidebarWidth,
          Math.min(maxSidebarWidth, newWidth)
        );

        setCurrentSidebarWidth(clampedWidth);
        onSidebarResize?.(clampedWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      if (isResizing) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }, [
      isResizing,
      sidebarPosition,
      minSidebarWidth,
      maxSidebarWidth,
      onSidebarResize,
    ]);

    // Calculate dynamic styles
    const sidebarWidthValue =
      typeof sidebarWidth === "number"
        ? `${currentSidebarWidth}px`
        : sidebarWidth;
    const collapsedWidthValue =
      typeof collapsedSidebarWidth === "number"
        ? `${collapsedSidebarWidth}px`
        : collapsedSidebarWidth;

    const contentPaddingClasses = {
      none: "",
      xs: "p-1",
      sm: "p-2",
      md: "p-6",
      lg: "p-8",
      xl: "p-12",
      "2xl": "p-16",
    };

    const animationClasses = {
      slide: "transition-all duration-300 ease-in-out",
      fade: "transition-opacity duration-300 ease-in-out",
      scale: "transition-transform duration-300 ease-in-out",
      none: "",
    };

    const layoutClasses = cn(
      "min-h-screen bg-background relative",
      variant === "fixed-header" && "flex flex-col",
      variant === "full-height" && "h-screen overflow-hidden",
      variant === "centered" && "container mx-auto",
      glassEffect && "backdrop-blur-sm bg-background/95",
      theme === "dark" && "dark",
      className
    );

    const headerClasses = cn(
      "border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 relative z-30",
      variant === "fixed-header" && "sticky top-0 z-40",
      glassEffect && "bg-card/30 backdrop-blur-xl"
    );

    const sidebarClasses = cn(
      "bg-card border-r flex flex-col",
      animationClasses[sidebarAnimation],
      sidebarBlur && "backdrop-blur-sm bg-card/95",
      // Position
      sidebarPosition === "right" ? "order-last border-l border-r-0" : "",
      // Mobile behavior
      isMobile
        ? [
            "fixed inset-y-0 z-50 shadow-xl",
            sidebarPosition === "left" ? "left-0" : "right-0",
            sidebarBehavior === "overlay" && "absolute",
            sidebarOpen
              ? "translate-x-0"
              : sidebarPosition === "left"
              ? "-translate-x-full"
              : "translate-x-full",
            hideSidebarOnMobile && !sidebarOpen ? "hidden" : "",
          ]
        : [
            // Desktop behavior
            sidebarBehavior === "overlay"
              ? "fixed inset-y-0 z-40 shadow-xl"
              : "relative",
          ]
    );

    const mainClasses = cn(
      "flex-1 min-w-0 relative", // min-w-0 prevents flex overflow
      contentPaddingClasses[contentPadding],
      variant === "fixed-header" && "flex-1",
      variant === "full-height" && "overflow-auto",
      variant === "centered" && "max-w-7xl mx-auto",
      sidebarBehavior === "overlay" &&
        !isMobile &&
        "transition-all duration-300"
    );

    // Loading component
    if (loading && !loadingOverlay) {
      return (
        <div className={layoutClasses} ref={ref} {...props}>
          <div className="flex items-center justify-center min-h-screen">
            {loadingComponent || (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    const sidebarContent = sidebar && (
      <>
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={closeMobileSidebar}
          />
        )}

        <aside
          ref={sidebarRef}
          className={sidebarClasses}
          style={{
            width: isMobile
              ? sidebarWidthValue
              : collapsibleSidebar && sidebarCollapsed
              ? collapsedWidthValue
              : sidebarWidthValue,
            height: variant === "full-height" ? "100vh" : undefined,
          }}
        >
          {/* Sidebar header with toggle button */}
          <div className="flex items-center justify-between p-3 border-b bg-card/50">
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold truncate text-foreground">
                  Menu
                </h2>
              </div>
            )}
            {collapsibleSidebar && (
              <button
                onClick={handleSidebarToggle}
                className="p-1.5 hover:bg-accent rounded-md transition-colors shrink-0"
                aria-label={
                  sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isMobile ? (
                  <X className="h-4 w-4" />
                ) : sidebarCollapsed ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
          </div>

          {/* Sidebar content */}
          <div
            className={cn(
              "flex-1 overflow-auto py-2",
              collapsibleSidebar && sidebarCollapsed && "px-2"
            )}
          >
            {sidebar}
          </div>

          {/* Resize handle */}
          {sidebarResizable && !sidebarCollapsed && !isMobile && (
            <div
              className={cn(
                "absolute top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-border transition-colors",
                sidebarPosition === "left" ? "right-0" : "left-0"
              )}
              onMouseDown={handleMouseDown}
            />
          )}
        </aside>
      </>
    );

    const headerContent = header && (
      <div className={headerClasses} style={{ height: headerHeight }}>
        <div className="flex items-center px-4 py-3">
          {/* Mobile menu button */}
          {sidebar && isMobile && (
            <button
              onClick={handleSidebarToggle}
              className="p-2 hover:bg-accent rounded-md transition-colors mr-3"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Desktop collapse button */}
          {sidebar &&
            !isMobile &&
            collapsibleSidebar &&
            showSidebarToggleInHeader && (
              <button
                onClick={handleSidebarToggle}
                className="p-2 hover:bg-accent rounded-md transition-colors mr-3"
                aria-label={
                  sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            )}

          <div className="flex-1 flex items-center space-x-4">{header}</div>
        </div>

        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs && (
          <div className="px-4 py-2 border-t bg-muted/30">{breadcrumbs}</div>
        )}
      </div>
    );

    const footerContent = footer && (
      <footer
        className="border-t bg-card/50 backdrop-blur px-4 py-3"
        style={{ height: footerHeight }}
      >
        {footer}
      </footer>
    );

    const layoutContent = (
      <>
        {loading && loadingOverlay && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            {loadingComponent || (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            )}
          </div>
        )}

        {headerContent}
        <div
          className={cn("flex min-h-0", variant === "full-height" && "flex-1")}
        >
          {sidebarContent}
          <main className={mainClasses}>{children}</main>
        </div>
        {footerContent}
      </>
    );

    if (variant === "fixed-header") {
      return (
        <div className={layoutClasses} ref={ref} {...props}>
          {headerContent}
          <div className="flex flex-1 min-h-0">
            {sidebarContent}
            <main className={mainClasses}>{children}</main>
          </div>
          {footerContent}
        </div>
      );
    }

    return (
      <div className={layoutClasses} ref={ref} {...props}>
        {layoutContent}
      </div>
    );
  }
);

DashboardLayout.displayName = "DashboardLayout";

export { DashboardLayout };
