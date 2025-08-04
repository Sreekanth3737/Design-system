import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Atoms/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your password...",
  },
};

export const WithValue: Story = {
  args: {
    value: "mypassword123",
    placeholder: "Enter your password...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled password input",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-80">
      <label className="block text-sm font-medium mb-2">Password</label>
      <PasswordInput {...args} />
    </div>
  ),
  args: {
    placeholder: "Enter your password...",
  },
};

export const WithValidation: Story = {
  render: (args) => (
    <div className="w-80 space-y-2">
      <label className="block text-sm font-medium">Password</label>
      <PasswordInput {...args} />
      <p className="text-sm text-muted-foreground">
        Password must be at least 8 characters long
      </p>
    </div>
  ),
  args: {
    placeholder: "Enter your password...",
  },
};
