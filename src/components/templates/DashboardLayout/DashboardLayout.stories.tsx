import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "./DashboardLayout";
import {
  Home,
  Settings,
  Users,
  BarChart3,
  Bell,
  Search,
  User,
  ChevronDown,
  FileText,
  Mail,
  Calendar,
  Folder,
  Star,
  Activity,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import {
  Header,
  HeaderBrand,
  HeaderContent,
  HeaderActions,
} from "../../organisms/Header";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "../../organisms/NavigationMenu";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Footer } from "../../organisms/Footer";
import { cn } from "../../../utils/cn";
import { fn } from "@storybook/test";
import { Card, CardHeader, CardBody } from "../../atoms/Card";

const meta: Meta<typeof DashboardLayout> = {
  title: "Layout/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],
  args: {
    onLayoutChange: fn(), // <-- This will apply to all stories
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An advanced dashboard layout component with extensive customization options including responsive behavior, collapsible sidebar with icons, resizable panels, loading states, and multiple layout variants. Features smart sidebar handling with icons-only mode when collapsed.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "fixed-header",
        "minimal",
        "full-height",
        "centered",
      ],
      description: "Layout variant with different behaviors",
    },
    contentPadding: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Padding around main content",
    },
    sidebarPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
      description: "Position of the sidebar",
    },
    breakpoint: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Responsive breakpoint for mobile behavior",
    },
    sidebarWidth: {
      control: { type: "number" },
      description: "Width of the sidebar in pixels",
    },
    collapsedSidebarWidth: {
      control: { type: "number" },
      description: "Width of collapsed sidebar in pixels",
    },
    collapsibleSidebar: {
      control: { type: "boolean" },
      description: "Whether the sidebar can be collapsed",
    },
    sidebarResizable: {
      control: { type: "boolean" },
      description: "Whether the sidebar can be resized by dragging",
    },
    hideSidebarOnMobile: {
      control: { type: "boolean" },
      description: "Hide sidebar on mobile devices",
    },
    loading: {
      control: { type: "boolean" },
      description: "Show loading state",
    },
    loadingOverlay: {
      control: { type: "boolean" },
      description: "Show loading as overlay instead of full screen",
    },
    glassEffect: {
      control: { type: "boolean" },
      description: "Apply glass morphism effect",
    },
    sidebarBlur: {
      control: { type: "boolean" },
      description: "Apply blur effect to sidebar",
    },
    persistSidebarState: {
      control: { type: "boolean" },
      description: "Remember sidebar collapsed state",
    },
    autoCollapseBelowBreakpoint: {
      control: { type: "boolean" },
      description: "Auto-collapse sidebar below breakpoint",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

// Enhanced sample content with more variety
const SampleContent = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Welcome to your enhanced dashboard with advanced layout features and
        responsive design.
      </p>
    </div>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "Total Users", value: "2,543", change: "+12%", icon: Users },
        { title: "Revenue", value: "$45,231", change: "+8%", icon: BarChart3 },
        { title: "Orders", value: "1,423", change: "+23%", icon: FileText },
        { title: "Growth", value: "32%", change: "+4%", icon: Activity },
      ].map((stat, i) => (
        <Card key={i} className="hover:shadow-md">
          <CardHeader
            icon={<stat.icon className="w-6 h-6 text-primary" />}
            title={stat.title}
          />
          <CardBody>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-green-600 mt-1">
                {stat.change} from last month
              </span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
    {/* Chart Placeholder */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 border rounded-xl bg-card">
        <h3 className="font-semibold mb-4">Analytics Overview</h3>
        <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-card">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Activity item {i}</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Enhanced header with more features
const EnhancedHeader = () => (
  <Header variant="elevated" className="flex-wrap md:flex-nowrap">
    <HeaderBrand href="#home" className="flex-shrink-0">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold">
        D
      </div>
      <span className="font-semibold hidden sm:inline">DashApp</span>
    </HeaderBrand>
    <HeaderContent className="w-full md:w-auto order-3 md:order-none mt-2 md:mt-0">
      <NavigationMenu className="flex-wrap">
        <NavigationMenuItem href="#dashboard" isActive>
          <Home className="h-4 w-4 mr-2" />
          <span className="hidden xs:inline">Dashboard</span>
        </NavigationMenuItem>
        <NavigationMenuItem href="#users" className="hidden md:flex">
          <Users className="h-4 w-4 mr-2" />
          Users
        </NavigationMenuItem>
        <NavigationMenuItem href="#analytics" className="hidden lg:flex">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </NavigationMenuItem>
        <NavigationMenuItem href="#settings" className="hidden xl:flex">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </NavigationMenuItem>
      </NavigationMenu>
    </HeaderContent>
    <HeaderActions className="flex-1 justify-end space-x-2 min-w-0">
      {/* Hide search on mobile */}
      <div className="relative w-full max-w-[140px] sm:max-w-[180px] md:max-w-[256px] hidden sm:block">
        <Input
          type="text"
          placeholder="Search anything..."
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          3
        </span>
      </Button>
      {/* Hide user name on mobile, show only icon */}
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 sm:max-w-none overflow-hidden"
      >
        <User className="w-7 h-7 md:w-4 md:h-4" />
        <span className="hidden sm:inline">John Doe</span>
        <ChevronDown className="w-7 h-7 md:w-4 md:h-4" />
      </Button>
    </HeaderActions>
  </Header>
);

// Enhanced sidebar items with more comprehensive navigation
const sidebarItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "#dashboard",
    active: true,
    badge: null,
  },
  {
    icon: Users,
    label: "Users",
    href: "#users",
    active: false,
    badge: "12",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "#analytics",
    active: false,
    badge: null,
  },
  {
    icon: FileText,
    label: "Documents",
    href: "#documents",
    active: false,
    badge: null,
  },
  {
    icon: Mail,
    label: "Messages",
    href: "#messages",
    active: false,
    badge: "5",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "#calendar",
    active: false,
    badge: null,
  },
  {
    icon: Folder,
    label: "Projects",
    href: "#projects",
    active: false,
    badge: null,
  },
  {
    icon: Star,
    label: "Favorites",
    href: "#favorites",
    active: false,
    badge: null,
  },
  {
    icon: Activity,
    label: "Activity",
    href: "#activity",
    active: false,
    badge: null,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "#settings",
    active: false,
    badge: null,
  },
];

// Enhanced sidebar that properly handles collapsed state with icons only
const EnhancedSidebar = ({ collapsed = false }: { collapsed?: boolean }) => (
  <nav className="flex flex-col h-full">
    {/* Main Navigation */}
    <div className="flex-1 py-4 space-y-1">
      {sidebarItems.map(({ icon: Icon, label, href, active, badge }) => (
        <div key={label} className={collapsed ? "px-3" : "px-4"}>
          <NavigationMenuItem
            href={href}
            isActive={active}
            className={cn(
              "flex items-center w-full transition-all duration-200",
              collapsed
                ? "justify-center px-2 py-3"
                : "justify-start px-3 py-2.5",
              collapsed && "group relative"
            )}
          >
            <span className="flex items-center gap-3 min-w-0">
              <Icon
                className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4")}
              />
              {!collapsed && (
                <>
                  <span className="truncate">{label}</span>
                  {badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </span>

            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {label}
                {badge && <span className="ml-2 text-xs">({badge})</span>}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
              </div>
            )}
          </NavigationMenuItem>
        </div>
      ))}
    </div>

    {/* Sidebar Footer */}
    <div className={cn("border-t p-4 space-y-2", collapsed && "px-3")}>
      <div className={collapsed ? "flex justify-center" : ""}>
        <NavigationMenuItem
          href="#help"
          className={cn(
            "flex items-center transition-all duration-200",
            collapsed
              ? "justify-center px-2 py-3 group relative"
              : "justify-start px-3 py-2.5 w-full"
          )}
        >
          <span className="flex items-center gap-3">
            <HelpCircle
              className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4")}
            />
            {!collapsed && <span>Help & Support</span>}
          </span>

          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Help & Support
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
            </div>
          )}
        </NavigationMenuItem>
      </div>

      {!collapsed && (
        <div className="pt-2 border-t">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </nav>
);

// Enhanced footer with more content
const EnhancedFooter = () => (
  <Footer>
    <div className="flex-1 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
      <span>© 2024 DashApp. All rights reserved.</span>
      <div className="hidden sm:block h-4 w-px bg-border"></div>
      <span className="text-sm hidden sm:inline">Version 2.1.0</span>
    </div>
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full justify-center sm:justify-end">
      <a
        href="#"
        className="text-sm hover:text-foreground transition-colors hidden md:inline"
      >
        Privacy Policy
      </a>
      <a
        href="#"
        className="text-sm hover:text-foreground transition-colors hidden md:inline"
      >
        Terms of Service
      </a>
      <a href="#" className="text-sm hover:text-foreground transition-colors">
        Support Center
      </a>
      <a
        href="#"
        className="text-sm hover:text-foreground transition-colors hidden lg:inline"
      >
        Status
      </a>
    </div>
  </Footer>
);

// Breadcrumb component
const SampleBreadcrumbs = () => (
  <nav className="flex items-center space-x-1 text-sm">
    <a href="#" className="text-muted-foreground hover:text-foreground">
      Dashboard
    </a>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    <a href="#" className="text-muted-foreground hover:text-foreground">
      Analytics
    </a>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    <span className="text-foreground">Overview</span>
  </nav>
);

// Sidebar wrapper that responds to collapse state
const SidebarWithCollapse = ({
  defaultCollapsed = false,
}: {
  defaultCollapsed?: boolean;
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  // Listen for sidebar toggle events from DashboardLayout
  React.useEffect(() => {
    const handler = (e: CustomEvent) => {
      setCollapsed(e.detail.collapsed);
    };
    window.addEventListener(
      "dashboard-sidebar-toggle",
      handler as EventListener
    );
    return () =>
      window.removeEventListener(
        "dashboard-sidebar-toggle",
        handler as EventListener
      );
  }, []);

  return <EnhancedSidebar collapsed={collapsed} />;
};

// Stories
export const Default: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <EnhancedSidebar />,
    children: <SampleContent />,
    onLayoutChange: fn(),
  },
};

export const WithFooter: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <EnhancedSidebar />,
    footer: <EnhancedFooter />,
    children: <SampleContent />,
  },
};

export const CollapsibleSidebar: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse defaultCollapsed={false} />,
    children: <SampleContent />,
    collapsibleSidebar: true,
    defaultSidebarCollapsed: false,
  },
};

export const CollapsedByDefault: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse defaultCollapsed={true} />,
    children: <SampleContent />,
    collapsibleSidebar: true,
    defaultSidebarCollapsed: true,
  },
};

export const FixedHeader: Story = {
  args: {
    variant: "fixed-header",
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    collapsibleSidebar: true,
  },
};

export const RightSidebar: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    sidebarPosition: "right",
    collapsibleSidebar: true,
  },
};

export const ResizableSidebar: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    sidebarResizable: true,
    collapsibleSidebar: true,
    minSidebarWidth: 200,
    maxSidebarWidth: 400,
  },
};

export const FullHeight: Story = {
  args: {
    variant: "full-height",
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    collapsibleSidebar: true,
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
    children: <SampleContent />,
    contentPadding: "lg",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    footer: <EnhancedFooter />,
    children: <SampleContent />,
    showBreadcrumbs: true,
    breadcrumbs: <SampleBreadcrumbs />,
    collapsibleSidebar: true,
  },
};

export const GlassEffect: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    glassEffect: true,
    sidebarBlur: true,
    collapsibleSidebar: true,
  },
};

export const LargePadding: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    contentPadding: "2xl",
    collapsibleSidebar: true,
  },
};

export const NoPadding: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: (
      <div className="p-8">
        <SampleContent />
      </div>
    ),
    contentPadding: "none",
    collapsibleSidebar: true,
  },
};

export const CustomWidth: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    sidebarWidth: 320,
    collapsedSidebarWidth: 80,
    collapsibleSidebar: true,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const LoadingOverlay: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    loading: true,
    loadingOverlay: true,
  },
};

export const CustomLoading: Story = {
  args: {
    loading: true,
    loadingComponent: (
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Loading Dashboard</p>
          <p className="text-muted-foreground">
            Please wait while we prepare your workspace...
          </p>
        </div>
      </div>
    ),
  },
};

export const AdvancedConfiguration: Story = {
  args: {
    variant: "fixed-header",
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    footer: <EnhancedFooter />,
    children: <SampleContent />,
    showBreadcrumbs: true,
    breadcrumbs: <SampleBreadcrumbs />,
    collapsibleSidebar: true,
    sidebarResizable: true,
    sidebarWidth: 300,
    collapsedSidebarWidth: 70,
    contentPadding: "lg",
    glassEffect: true,
    sidebarBlur: true,
    persistSidebarState: true,
    showSidebarToggleInHeader: true,
    minSidebarWidth: 250,
    maxSidebarWidth: 450,
    sidebarAnimation: "slide",
  },
};

export const MobileOptimized: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    hideSidebarOnMobile: true,
    breakpoint: "lg",
    collapsibleSidebar: true,
    autoCollapseBelowBreakpoint: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const OffCanvasSidebar: Story = {
  args: {
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    sidebarBehavior: "off-canvas",
    collapsibleSidebar: true,
    sidebarAnimation: "slide",
  },
};

export const Centered: Story = {
  args: {
    variant: "centered",
    header: <EnhancedHeader />,
    sidebar: <SidebarWithCollapse />,
    children: <SampleContent />,
    collapsibleSidebar: true,
    contentPadding: "xl",
  },
};
