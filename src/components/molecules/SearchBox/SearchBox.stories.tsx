import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox } from "./SearchBox";

const meta: Meta<typeof SearchBox> = {
  title: "Molecules/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Search...",
    defaultValue: "React components",
  },
};

export const WithoutClearButton: Story = {
  args: {
    placeholder: "Search...",
    showClearButton: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Search...",
    disabled: true,
  },
};
