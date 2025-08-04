import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Users, Star, Settings, MoreVertical, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive Card component composed of subcomponents: `CardHeader`, `CardBody`, and `CardFooter`. It supports variants (`default`, `outlined`, `elevated`), icons, actions, and more.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "outlined", "elevated"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

/* ---------------------------------- Default ---------------------------------- */
export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Card Title" />
      <CardBody description="This is a description for the card.">
        <div className="text-2xl font-bold">Main content goes here</div>
      </CardBody>
    </Card>
  ),
};

/* ---------------------------------- With Icon --------------------------------- */
export const WithIcon: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Users className="w-6 h-6 text-primary" />}
        title="Card with Icon"
      />
      <CardBody description="An icon is displayed in the header.">
        <p className="text-sm">Body content goes here.</p>
      </CardBody>
    </Card>
  ),
};

export const CenteredStats: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card
      {...args}
      className="hover:shadow-lg text-center items-center justify-center"
    >
      <CardHeader icon={<Users className="w-10 h-10 text-primary mx-auto" />} />
      <CardBody>
        <div className="text-4xl font-bold">2,543</div>
        <p className="text-sm text-muted-foreground mt-1">Total Users</p>
      </CardBody>
    </Card>
  ),
};

export const Hoverable: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card
      {...args}
      className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <CardHeader
        icon={<Star className="w-6 h-6 text-yellow-500" />}
        title="Hover Me"
      />
      <CardBody description="This card elevates on hover.">
        <p className="text-sm">Try hovering over this card!</p>
      </CardBody>
    </Card>
  ),
};

export const WithListItems: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Settings className="w-6 h-6 text-blue-500" />}
        title="Settings Overview"
      />
      <CardBody>
        <ul className="space-y-3">
          {[
            { label: "Profile", icon: <Users className="w-4 h-4" /> },
            { label: "Billing", icon: <Star className="w-4 h-4" /> },
            { label: "Security", icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="text-primary">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  ),
};

export const AnimatedHover: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card {...args}>
        <CardHeader
          icon={<Users className="w-6 h-6 text-primary" />}
          title="Animated Hover"
        />
        <CardBody description="Framer Motion hover effect">
          <p className="text-sm">Smooth scaling & shadow on hover.</p>
        </CardBody>
      </Card>
    </motion.div>
  ),
};

export const ListWithBadges: Story = {
  render: () => (
    <Card variant="outlined">
      <CardHeader
        icon={<Settings className="w-6 h-6 text-blue-500" />}
        title="System Settings"
      />
      <CardBody>
        <ul className="divide-y divide-border">
          {[
            { label: "Profile", status: "Active", color: "text-green-600" },
            { label: "Billing", status: "Pending", color: "text-yellow-500" },
            { label: "Security", status: "Locked", color: "text-red-500" },
          ].map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between py-2"
            >
              <span>{item.label}</span>
              <span className={`text-sm font-medium ${item.color}`}>
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  ),
};

export const SkeletonState: Story = {
  args: { variant: "default" },
  render: () => (
    <Card className="animate-pulse">
      <CardHeader
        icon={<div className="h-6 w-6 bg-gray-300 rounded" />}
        title={<div className="h-4 w-1/3 bg-gray-300 rounded" />}
      />
      <CardBody>
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-300 rounded" />
          <div className="h-3 w-2/3 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </CardBody>
      <CardFooter>
        <div className="h-8 w-16 bg-gray-300 rounded" />
        <div className="h-8 w-16 bg-gray-300 rounded" />
      </CardFooter>
    </Card>
  ),
};

export const StatsWithTrend: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args} className="items-center text-center">
      <CardHeader
        icon={<BarChart3 className="w-8 h-8 text-green-600 mx-auto" />}
        title="Revenue"
      />
      <CardBody>
        <div className="text-3xl font-bold">$45,231</div>
        <div className="flex items-center justify-center mt-1 text-sm text-green-600">
          ▲ 12% this month
        </div>
      </CardBody>
    </Card>
  ),
};

export const FooterActionsCentered: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Centered Footer Actions" />
      <CardBody>
        <p className="text-sm">Actions below are centered.</p>
      </CardBody>
      <CardFooter className="justify-center">
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
          Cancel
        </button>
        <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90 text-sm">
          Save
        </button>
      </CardFooter>
    </Card>
  ),
};

export const ImageOverlay: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card {...args} className="overflow-hidden">
      <div className="relative">
        <img
          src="https://source.unsplash.com/random/800x400?technology"
          alt="Header"
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            Overlay Title
          </span>
        </div>
      </div>
      <CardBody>
        <p className="text-sm">
          This card uses an image with a dark overlay and text.
        </p>
      </CardBody>
    </Card>
  ),
};

export const StatsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Users", value: "2,543", icon: Users },
        { label: "Revenue", value: "$45k", icon: Star },
        { label: "Orders", value: "1,423", icon: Settings },
        { label: "Growth", value: "32%", icon: BarChart3 },
      ].map((item) => (
        <Card
          key={item.label}
          className="items-center text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <CardHeader
            icon={<item.icon className="w-6 h-6 text-primary mx-auto" />}
          />
          <CardBody>
            <div className="text-lg font-bold">{item.value}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

/* --------------------------------- Outlined ---------------------------------- */
export const Outlined: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Star className="w-6 h-6 text-yellow-500" />}
        title="Outlined Card"
      />
      <CardBody description="This card uses the outlined variant.">
        <p className="text-base">Outlined card content</p>
      </CardBody>
    </Card>
  ),
};

/* --------------------------------- Elevated ---------------------------------- */
export const Elevated: Story = {
  args: { variant: "elevated" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Settings className="w-6 h-6 text-blue-500" />}
        title="Elevated Card"
      />
      <CardBody description="This card uses the elevated variant.">
        <p className="text-base">Elevated card content</p>
      </CardBody>
    </Card>
  ),
};

/* ------------------------------- With Actions ------------------------------- */
export const WithActions: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Users className="w-6 h-6 text-primary" />}
        title="Card with Action"
        actions={
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => alert("Action clicked!")}
          >
            Action
          </button>
        }
      />
      <CardBody description="This card has an action button.">
        <div className="text-base">Card content with action</div>
      </CardBody>
    </Card>
  ),
};

/* ------------------------------- With Footer ------------------------------- */
export const WithFooter: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Users className="w-6 h-6 text-primary" />}
        title="Card with Footer"
      />
      <CardBody description="This card demonstrates a footer with buttons.">
        <p className="text-sm">Body content goes here.</p>
      </CardBody>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
          Cancel
        </button>
        <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90 text-sm">
          Save
        </button>
      </CardFooter>
    </Card>
  ),
};

/* ------------------------------ Responsive Demo ----------------------------- */
export const Responsive: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Responsive Card" />
      <CardBody description="Resize the window to see responsive padding.">
        <p className="text-base mb-3">
          This card adjusts its padding based on screen size.
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <button className="bg-primary text-white px-3 py-1 rounded">
            Primary
          </button>
          <button className="bg-secondary text-foreground px-3 py-1 rounded">
            Secondary
          </button>
        </div>
      </CardBody>
    </Card>
  ),
};

// A decorator to wrap the story in a dark mode container
const DarkDecorator = (Story: any) => (
  <div className="dark bg-gray-900 p-6 min-h-screen text-white">
    <Story />
  </div>
);

export const DarkMode: Story = {
  args: { variant: "elevated" },
  decorators: [DarkDecorator],
  render: (args) => (
    <Card {...args}>
      <CardHeader
        icon={<Settings className="w-6 h-6 text-blue-400" />}
        title="Dark Mode Card"
        actions={
          <button className="text-blue-400 text-sm hover:underline">
            Action
          </button>
        }
      />
      <CardBody description="This card is rendered in dark mode.">
        <p className="text-sm">
          You can preview how the card looks on a dark background.
        </p>
      </CardBody>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm">
          Cancel
        </button>
        <button className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm">
          Save
        </button>
      </CardFooter>
    </Card>
  ),
};
