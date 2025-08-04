import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./NavigationMenu";

export default {
  title: "Organisms/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible navigation menu component with support for various item styles and states.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

// Basic navigation menu
export const Default = () => (
  <NavigationMenu>
    <NavigationMenuLink href="#home" isActive>
      Home
    </NavigationMenuLink>
    <NavigationMenuLink href="#about">About</NavigationMenuLink>
    <NavigationMenuLink href="#services">Services</NavigationMenuLink>
    <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
  </NavigationMenu>
);

// Navigation with different item variants
export const WithItemVariants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium mb-4">Default Variant</h3>
      <NavigationMenu>
        <NavigationMenuItem href="#home" isActive>
          Home
        </NavigationMenuItem>
        <NavigationMenuItem href="#about">About</NavigationMenuItem>
        <NavigationMenuItem href="#services">Services</NavigationMenuItem>
        <NavigationMenuItem href="#contact">Contact</NavigationMenuItem>
      </NavigationMenu>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Ghost Variant</h3>
      <NavigationMenu>
        <NavigationMenuItem href="#home" variant="ghost" isActive>
          Home
        </NavigationMenuItem>
        <NavigationMenuItem href="#about" variant="ghost">
          About
        </NavigationMenuItem>
        <NavigationMenuItem href="#services" variant="ghost">
          Services
        </NavigationMenuItem>
        <NavigationMenuItem href="#contact" variant="ghost">
          Contact
        </NavigationMenuItem>
      </NavigationMenu>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4">Underline Variant</h3>
      <NavigationMenu>
        <NavigationMenuItem href="#home" variant="underline" isActive>
          Home
        </NavigationMenuItem>
        <NavigationMenuItem href="#about" variant="underline">
          About
        </NavigationMenuItem>
        <NavigationMenuItem href="#services" variant="underline">
          Services
        </NavigationMenuItem>
        <NavigationMenuItem href="#contact" variant="underline">
          Contact
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  </div>
);

// Vertical navigation
export const Vertical = () => (
  <NavigationMenu className="flex-col space-x-0 space-y-2 items-start">
    <NavigationMenuLink href="#dashboard" isActive>
      Dashboard
    </NavigationMenuLink>
    <NavigationMenuLink href="#projects">Projects</NavigationMenuLink>
    <NavigationMenuLink href="#team">Team</NavigationMenuLink>
    <NavigationMenuLink href="#settings">Settings</NavigationMenuLink>
  </NavigationMenu>
);

// Navigation with icons (using text icons for demo)
export const WithIcons = () => (
  <NavigationMenu>
    <NavigationMenuItem href="#home" variant="ghost" isActive>
      🏠 Home
    </NavigationMenuItem>
    <NavigationMenuItem href="#search" variant="ghost">
      🔍 Search
    </NavigationMenuItem>
    <NavigationMenuItem href="#notifications" variant="ghost">
      🔔 Notifications
    </NavigationMenuItem>
    <NavigationMenuItem href="#profile" variant="ghost">
      👤 Profile
    </NavigationMenuItem>
  </NavigationMenu>
);

// Responsive navigation
export const Responsive = () => (
  <NavigationMenu className="flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 items-start sm:items-center">
    <NavigationMenuLink href="#products" isActive>
      Products
    </NavigationMenuLink>
    <NavigationMenuLink href="#solutions">Solutions</NavigationMenuLink>
    <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
    <NavigationMenuLink href="#docs">Documentation</NavigationMenuLink>
    <NavigationMenuLink href="#support">Support</NavigationMenuLink>
  </NavigationMenu>
);

// Large navigation with more spacing
export const Large = () => (
  <NavigationMenu className="space-x-8">
    <NavigationMenuItem href="#overview" variant="underline" isActive>
      Overview
    </NavigationMenuItem>
    <NavigationMenuItem href="#features" variant="underline">
      Features
    </NavigationMenuItem>
    <NavigationMenuItem href="#integrations" variant="underline">
      Integrations
    </NavigationMenuItem>
    <NavigationMenuItem href="#enterprise" variant="underline">
      Enterprise
    </NavigationMenuItem>
  </NavigationMenu>
);

// Compact navigation
export const Compact = () => (
  <NavigationMenu className="space-x-2 lg:space-x-3">
    <NavigationMenuLink href="#home" isActive className="text-xs">
      Home
    </NavigationMenuLink>
    <NavigationMenuLink href="#blog" className="text-xs">
      Blog
    </NavigationMenuLink>
    <NavigationMenuLink href="#help" className="text-xs">
      Help
    </NavigationMenuLink>
    <NavigationMenuLink href="#contact" className="text-xs">
      Contact
    </NavigationMenuLink>
  </NavigationMenu>
);

// Custom styled navigation
export const CustomStyled = () => (
  <NavigationMenu className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2">
    <NavigationMenuItem
      href="#design"
      variant="ghost"
      isActive
      className="font-semibold"
    >
      Design System
    </NavigationMenuItem>
    <NavigationMenuItem href="#components" variant="ghost">
      Components
    </NavigationMenuItem>
    <NavigationMenuItem href="#tokens" variant="ghost">
      Tokens
    </NavigationMenuItem>
    <NavigationMenuItem href="#guidelines" variant="ghost">
      Guidelines
    </NavigationMenuItem>
  </NavigationMenu>
);

// Interactive example with state
export const Interactive = () => {
  const [activeItem, setActiveItem] = React.useState("home");

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <NavigationMenu>
      {menuItems.map((item) => (
        <NavigationMenuItem
          key={item.id}
          href={`#${item.id}`}
          variant="ghost"
          isActive={activeItem === item.id}
          onClick={(e) => {
            e.preventDefault();
            setActiveItem(item.id);
          }}
        >
          {item.label}
        </NavigationMenuItem>
      ))}
    </NavigationMenu>
  );
};

// All states demonstration
export const AllStates = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium mb-2">Normal State</h3>
      <NavigationMenu>
        <NavigationMenuLink href="#normal">Normal Link</NavigationMenuLink>
      </NavigationMenu>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2">Active State</h3>
      <NavigationMenu>
        <NavigationMenuLink href="#active" isActive>
          Active Link
        </NavigationMenuLink>
      </NavigationMenu>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-2">Disabled State</h3>
      <NavigationMenu>
        <NavigationMenuLink
          href="#disabled"
          className="opacity-50 cursor-not-allowed hover:text-muted-foreground"
          onClick={(e) => e.preventDefault()}
        >
          Disabled Link
        </NavigationMenuLink>
      </NavigationMenu>
    </div>
  </div>
);
