import type { Meta, StoryObj } from "@storybook/react";
import { UserProfile } from "./UserProfile";

const meta: Meta<typeof UserProfile> = {
  title: "Molecules/UserProfile",
  component: UserProfile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["online", "offline", "away"],
    },
    avatarSize: {
      control: { type: "select" },
      options: ["sm", "default", "lg", "xl"],
    },
    layout: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
    email: "john.doe@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
};

export const WithRole: Story = {
  args: {
    name: "sreekanth",
    email: "sreekanth@shazab.in",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
};

export const WithStatus: Story = {
  args: {
    name: "mohanlal",
    email: "mohanlal@gmail.com",
    status: "online",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
};

export const Vertical: Story = {
  args: {
    name: "Alia but",
    email: "alia.but@gmail.com",
    role: "Designer",
    status: "away",
    layout: "vertical",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
};

export const WithoutAvatar: Story = {
  args: {
    name: "Charlie Wilson",
    email: "charlie.wilson@gmail.com",
    role: "Developer",
    status: "offline",
  },
};

export const LargeAvatar: Story = {
  args: {
    name: "aiswarya roy",
    email: "aiswarya.roy@gmail.com",
    avatarSize: "lg",
    status: "online",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
};
