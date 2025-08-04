import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Hello World",
    placeholder: "Enter text...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};
