import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../../atoms/Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Molecules/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "warning", "success", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Information",
    description: "This is a default alert dialog with some information.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Delete Account",
    description:
      "Are you sure you want to delete your account? This action cannot be undone.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description:
      "This action may have unintended consequences. Please proceed with caution.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Continue</Button>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your account has been created successfully!",
    actions: <Button size="sm">Continue</Button>,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "New Update Available",
    description:
      "A new version of the application is available. Would you like to update now?",
    actions: (
      <>
        <Button variant="outline" size="sm">
          Later
        </Button>
        <Button size="sm">Update Now</Button>
      </>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "No Icon",
    description: "This alert dialog does not show an icon.",
    showIcon: false,
  },
};

export const CustomContent: Story = {
  args: {
    variant: "warning",
    title: "Custom Content",
    children: (
      <div className="space-y-2">
        <p className="text-sm">This alert contains custom content:</p>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Custom bullet points</li>
          <li>Additional information</li>
          <li>More details</li>
        </ul>
      </div>
    ),
    actions: <Button size="sm">Got it</Button>,
  },
};
