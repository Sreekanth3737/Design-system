import React from "react";
import { Header, HeaderBrand, HeaderContent, HeaderActions } from "./Header";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "../NavigationMenu/NavigationMenu";

export default {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A flexible header component with support for branding, navigation, and actions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "sticky", "elevated", "bordered", "minimal"],
      description: "Visual variant of the header",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the header padding",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

// Basic header
export const Default = () => (
  <Header>
    <HeaderBrand>Brand</HeaderBrand>
    <HeaderActions>
      <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
        Sign In
      </button>
    </HeaderActions>
  </Header>
);

// Header with navigation
export const WithNavigation = () => (
  <Header>
    <HeaderBrand href="#home">
      <span className="text-primary">🚀</span>
      <span>Shazab LLP Inc</span>
    </HeaderBrand>

    <HeaderContent>
      <NavigationMenu>
        <NavigationMenuItem href="#products" variant="ghost" isActive>
          Products
        </NavigationMenuItem>
        <NavigationMenuItem href="#solutions" variant="ghost">
          Solutions
        </NavigationMenuItem>
        <NavigationMenuItem href="#pricing" variant="ghost">
          Pricing
        </NavigationMenuItem>
        <NavigationMenuItem href="#docs" variant="ghost">
          Docs
        </NavigationMenuItem>
      </NavigationMenu>
    </HeaderContent>

    <HeaderActions>
      <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
        Sign In
      </button>
      <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Get Started
      </button>
    </HeaderActions>
  </Header>
);

// Different variants
export const AllVariants = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Default</h3>
      <Header variant="default">
        <HeaderBrand>Default Header</HeaderBrand>
        <HeaderActions>
          <button className="px-3 py-1 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Elevated</h3>
      <Header variant="elevated">
        <HeaderBrand>Elevated Header</HeaderBrand>
        <HeaderActions>
          <button className="px-3 py-1 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Bordered</h3>
      <Header variant="bordered">
        <HeaderBrand>Bordered Header</HeaderBrand>
        <HeaderActions>
          <button className="px-3 py-1 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Minimal</h3>
      <Header variant="minimal">
        <HeaderBrand>Minimal Header</HeaderBrand>
        <HeaderActions>
          <button className="px-3 py-1 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>
  </div>
);

// Different sizes
export const AllSizes = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Small</h3>
      <Header size="sm" variant="elevated">
        <HeaderBrand>Small Header</HeaderBrand>
        <HeaderActions>
          <button className="px-2 py-1 text-xs border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Medium (Default)</h3>
      <Header size="md" variant="elevated">
        <HeaderBrand>Medium Header</HeaderBrand>
        <HeaderActions>
          <button className="px-3 py-1 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2 px-4">Large</h3>
      <Header size="lg" variant="elevated">
        <HeaderBrand>Large Header</HeaderBrand>
        <HeaderActions>
          <button className="px-4 py-2 text-sm border rounded">Action</button>
        </HeaderActions>
      </Header>
    </div>
  </div>
);

// Sticky header (would be sticky in real implementation)
export const Sticky = () => (
  <div className="h-96 overflow-y-auto">
    <Header variant="sticky">
      <HeaderBrand>Sticky Header</HeaderBrand>
      <HeaderContent>
        <NavigationMenu>
          <NavigationMenuItem href="#section1" variant="ghost">
            Section 1
          </NavigationMenuItem>
          <NavigationMenuItem href="#section2" variant="ghost">
            Section 2
          </NavigationMenuItem>
          <NavigationMenuItem href="#section3" variant="ghost">
            Section 3
          </NavigationMenuItem>
        </NavigationMenu>
      </HeaderContent>
      <HeaderActions>
        <button className="px-3 py-1 text-sm border rounded">Menu</button>
      </HeaderActions>
    </Header>

    <div className="p-4 space-y-4">
      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Content Section 1</p>
      </div>
      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Content Section 2</p>
      </div>
      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Content Section 3</p>
      </div>
      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Scroll to see sticky behavior</p>
      </div>
    </div>
  </div>
);

// Complex header with search
export const WithSearch = () => (
  <Header variant="elevated">
    <HeaderBrand href="#home">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
        A
      </div>
      <span>GuardTower</span>
    </HeaderBrand>

    <HeaderContent>
      <div className="max-w-md w-full">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </HeaderContent>

    <HeaderActions>
      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent">
        🔔
      </button>
      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer hover:bg-accent">
        👤
      </div>
    </HeaderActions>
  </Header>
);

// Dashboard header
export const Dashboard = () => (
  <Header variant="elevated">
    <HeaderBrand>
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        D
      </div>
      <span>Dashboard</span>
    </HeaderBrand>

    <HeaderContent align="right">
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <span>Welcome back, John</span>
        <span>•</span>
        <span>Last login: 2 hours ago</span>
      </div>
    </HeaderContent>

    <HeaderActions>
      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent relative">
        📊
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent">
        ⚙️
      </button>
      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer">
        JD
      </div>
    </HeaderActions>
  </Header>
);

// E-commerce header
export const ECommerce = () => (
  <Header variant="default">
    <HeaderBrand href="#home">
      <span className="text-2xl">🛍️</span>
      <span className="text-xl font-bold">ShopName</span>
    </HeaderBrand>

    <HeaderContent>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuItem href="#categories" variant="ghost">
          Categories
        </NavigationMenuItem>
        <NavigationMenuItem href="#deals" variant="ghost">
          Deals
        </NavigationMenuItem>
        <NavigationMenuItem href="#new" variant="ghost">
          New Arrivals
        </NavigationMenuItem>
        <NavigationMenuItem href="#brands" variant="ghost">
          Brands
        </NavigationMenuItem>
      </NavigationMenu>
    </HeaderContent>

    <HeaderActions>
      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent">
        ❤️
      </button>
      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent relative">
        🛒
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
          3
        </span>
      </button>
      <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
        Account
      </button>
    </HeaderActions>
  </Header>
);

// Mobile-friendly header
export const MobileFriendly = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div>
      <Header variant="elevated">
        <HeaderBrand>
          <span className="text-primary font-bold">📱 Mobile App</span>
        </HeaderBrand>

        <HeaderContent className="md:flex hidden">
          <NavigationMenu>
            <NavigationMenuItem href="#home" variant="ghost" isActive>
              Home
            </NavigationMenuItem>
            <NavigationMenuItem href="#about" variant="ghost">
              About
            </NavigationMenuItem>
            <NavigationMenuItem href="#contact" variant="ghost">
              Contact
            </NavigationMenuItem>
          </NavigationMenu>
        </HeaderContent>

        <HeaderActions>
          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hidden md:block">
            Download
          </button>
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </HeaderActions>
      </Header>

      {isMenuOpen && (
        <div className="md:hidden border-b bg-background p-4">
          <NavigationMenu className="flex-col space-x-0 space-y-3 items-start">
            <NavigationMenuItem href="#home" variant="ghost" isActive>
              Home
            </NavigationMenuItem>
            <NavigationMenuItem href="#about" variant="ghost">
              About
            </NavigationMenuItem>
            <NavigationMenuItem href="#contact" variant="ghost">
              Contact
            </NavigationMenuItem>
            <button className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded mt-3">
              Download App
            </button>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

// Content-focused header
export const ContentFocused = () => (
  <Header variant="minimal" size="lg">
    <HeaderBrand href="#home">
      <span className="text-2xl font-serif">✍️ Blog</span>
    </HeaderBrand>

    <HeaderContent align="center">
      <NavigationMenu>
        <NavigationMenuItem href="#articles" variant="underline" isActive>
          Articles
        </NavigationMenuItem>
        <NavigationMenuItem href="#tutorials" variant="underline">
          Tutorials
        </NavigationMenuItem>
        <NavigationMenuItem href="#reviews" variant="underline">
          Reviews
        </NavigationMenuItem>
        <NavigationMenuItem href="#newsletter" variant="underline">
          Newsletter
        </NavigationMenuItem>
      </NavigationMenu>
    </HeaderContent>

    <HeaderActions>
      <button className="text-sm text-muted-foreground hover:text-foreground">
        Subscribe
      </button>
    </HeaderActions>
  </Header>
);
