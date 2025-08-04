import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "../../atoms/Button";
import React from "react";
import { Settings, User, Bell, HelpCircle } from "lucide-react";

const meta = {
  title: "Molecules/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-gray-500">
            Set the dimensions for the layer.
          </p>
          <div className="flex gap-4 pt-2">
            <Button size="sm">Apply</Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ArrowCustomization: Story = {
  render: () => (
    <div className="flex gap-4">
      {[
        { color: "white" as const, size: "sm" as const },
        { color: "primary" as const, size: "md" as const },
        { color: "secondary" as const, size: "lg" as const },
      ].map((arrowProps, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <Button>Arrow {arrowProps.color}</Button>
          </PopoverTrigger>
          <PopoverContent arrow={arrowProps}>
            <p className="text-sm">
              Arrow with {arrowProps.color} color and {arrowProps.size} size
            </p>
          </PopoverContent>
        </Popover>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button>No Arrow</Button>
        </PopoverTrigger>
        <PopoverContent arrow={{ hide: true }}>
          <p className="text-sm">This popover has no arrow</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const HoverTrigger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="flex gap-4">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              Hover Me
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <p className="text-sm">This popover shows on hover</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button>Click Me</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm">This popover shows on click</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const AnimationVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      {["none", "fade", "zoom", "slide"].map((animation) => (
        <Popover key={animation}>
          <PopoverTrigger asChild>
            <Button>{animation} Animation</Button>
          </PopoverTrigger>
          <PopoverContent animation={animation as any}>
            <p className="text-sm">This uses the {animation} animation</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const NestedPopovers: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Menu</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <h4 className="font-medium">Main Menu</h4>
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Settings
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h5 className="font-medium">Settings Menu</h5>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Preferences
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Help
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h5 className="font-medium">Help Menu</h5>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    Support
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomPositioning: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Custom Position</Button>
        </PopoverTrigger>
        <PopoverContent
          position={{
            side: "bottom",
            align: "start",
            sideOffset: 8,
            alignOffset: 20,
          }}
        >
          <p className="text-sm">
            Custom positioned popover with specific offsets
          </p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>No Collisions</Button>
        </PopoverTrigger>
        <PopoverContent handleCollisions={false}>
          <p className="text-sm">
            This popover doesn't handle viewport collisions
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {["auto", "sm", "md", "lg", "xl"].map((size) => (
        <Popover key={size}>
          <PopoverTrigger asChild>
            <Button>{size} Size</Button>
          </PopoverTrigger>
          <PopoverContent size={size as any}>
            <div className="space-y-2">
              <h4 className="font-medium">{size} Popover</h4>
              <p className="text-sm text-gray-500">
                This popover uses the {size} size variant
              </p>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild showOnHover>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent size="sm" animation="zoom">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-gray-500">Manage your preferences</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild showOnHover>
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent size="sm" animation="zoom">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile</h4>
            <p className="text-sm text-gray-500">View and edit your profile</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild showOnHover>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent size="sm" animation="zoom">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-gray-500">You have 3 unread messages</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild showOnHover>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent size="sm" animation="zoom">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Help</h4>
            <p className="text-sm text-gray-500">
              Get support and documentation
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
