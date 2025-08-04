import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout, AuthLayoutProps } from "./AuthLayout";
import { Input, Label, Button } from "../../atoms";

const meta: Meta<AuthLayoutProps> = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    backgroundVariant: {
      control: { type: "select" },
      options: ["default", "gradient", "pattern", "image"],
    },
    maxWidth: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    cardVariant: {
      control: { type: "select" },
      options: ["default", "elevated", "bordered", "glass"],
    },
    headerAlignment: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    theme: {
      control: { type: "select" },
      options: [
        "default",
        "dark",
        "ocean",
        "sunset",
        "forest",
        "lavender",
        "monochrome",
        "neon",
        "corporate",
        "minimal",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<AuthLayoutProps>;

// ✅ Sample Components
const SampleLogo = () => (
  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </div>
);

// 👉 Login form
const LoginForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="login-email" className="mb-1">
        Email
      </Label>
      <Input
        id="login-email"
        className="w-full"
        placeholder="Enter your email"
        type="email"
      />
    </div>
    <div>
      <Label htmlFor="login-password" className="mb-1">
        Password
      </Label>
      <Input
        id="login-password"
        className="w-full"
        placeholder="Enter your password"
        type="password"
      />
    </div>
    <div className="flex items-center justify-between">
      <Label className="flex items-center text-sm">
        <Input type="checkbox" className="mr-2" />
        Remember me
      </Label>
      <a href="#" className="text-sm text-primary hover:underline">
        Forgot password?
      </a>
    </div>
    <Button className="w-full" type="submit">
      Sign In
    </Button>
  </form>
);

// 👉 Signup form
const SignupForm = () => (
  <form className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label htmlFor="signup-firstname" className="mb-1">
          First name
        </Label>
        <Input
          id="signup-firstname"
          className="w-full"
          placeholder="John"
          type="text"
        />
      </div>
      <div>
        <Label htmlFor="signup-lastname" className="mb-1">
          Last name
        </Label>
        <Input
          id="signup-lastname"
          className="w-full"
          placeholder="Doe"
          type="text"
        />
      </div>
    </div>
    <div>
      <Label htmlFor="signup-email" className="mb-1">
        Email
      </Label>
      <Input
        id="signup-email"
        className="w-full"
        placeholder="john.doe@example.com"
        type="email"
      />
    </div>
    <div>
      <Label htmlFor="signup-password" className="mb-1">
        Password
      </Label>
      <Input
        id="signup-password"
        className="w-full"
        placeholder="Create a strong password"
        type="password"
      />
    </div>
    <div>
      <Label htmlFor="signup-confirm" className="mb-1">
        Confirm Password
      </Label>
      <Input
        id="signup-confirm"
        className="w-full"
        placeholder="Confirm your password"
        type="password"
      />
    </div>
    <div className="flex items-center">
      <Input type="checkbox" className="mr-2" id="signup-terms" />
      <Label htmlFor="signup-terms" className="text-sm text-muted-foreground">
        I agree to the{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </Label>
    </div>
    <Button className="w-full" type="submit">
      Create Account
    </Button>
  </form>
);

const FooterLinks = () => (
  <div className="text-center space-y-2">
    <p className="text-sm text-muted-foreground">
      Don't have an account?{" "}
      <a href="#" className="text-primary hover:underline font-medium">
        Sign up
      </a>
    </p>
    <div className="flex justify-center gap-4 text-xs text-muted-foreground">
      <a href="#" className="hover:text-primary transition-colors">
        Privacy
      </a>
      <a href="#" className="hover:text-primary transition-colors">
        Terms
      </a>
      <a href="#" className="hover:text-primary transition-colors">
        Support
      </a>
    </div>
  </div>
);

// ✅ Stories
export const Default: Story = {
  args: {
    title: "Sign in to your account",
    description: "Enter your credentials to access your account.",
    children: <LoginForm />,
  },
};

export const WithLogo: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Welcome to Acme Corp",
    subtitle: "Sign in to continue",
    description: "Enter your credentials to access your dashboard.",
    children: <LoginForm />,
    footerContent: <FooterLinks />,
  },
};

export const SignUp: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Create your account",
    description: "Join thousands of users who trust our platform.",
    children: <SignupForm />,
    maxWidth: "lg",
    footerContent: (
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="#" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </p>
    ),
  },
};

export const ForgotPassword: Story = {
  args: {
    title: "Forgot your password?",
    description:
      "No worries! Enter your email and we'll send you a reset link.",
    children: (
      <form className="space-y-4">
        <Input className="w-full" placeholder="Enter your email" type="email" />
        <Button className="w-full" type="submit">
          Send Reset Link
        </Button>
      </form>
    ),
    showBackButton: true,
    onBackClick: () => console.log("Back clicked"),
  },
};

export const TwoFactorAuth: Story = {
  args: {
    title: "Two-factor authentication",
    description: "Please enter the verification code to complete sign in.",
    children: (
      <div className="space-y-4">
        <p>Enter the 6-digit code sent to your app:</p>
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              className="w-12 h-12 border border-input rounded-md text-center text-lg font-mono"
              maxLength={1}
              type="text"
            />
          ))}
        </div>
        <Button className="w-full" type="submit">
          Verify Code
        </Button>
      </div>
    ),
    maxWidth: "sm",
    showBackButton: true,
  },
};

export const Loading: Story = {
  args: {
    title: "Sign in to your account",
    description: "Enter your credentials to access your account.",
    children: <LoginForm />,
    isLoading: true,
  },
};

export const GradientBackground: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Welcome back",
    description: "Sign in to continue to your dashboard.",
    children: <LoginForm />,
    backgroundVariant: "gradient",
    cardVariant: "elevated",
    footerContent: <FooterLinks />,
  },
};

export const PatternBackground: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Join our community",
    description: "Create an account to get started.",
    children: <SignupForm />,
    backgroundVariant: "pattern",
    cardVariant: "bordered",
    maxWidth: "lg",
  },
};

export const GlassCard: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Premium Experience",
    subtitle: "Exclusive Access",
    description: "Enter your credentials for premium features.",
    children: <LoginForm />,
    backgroundVariant: "gradient",
    cardVariant: "glass",
    footerContent: <FooterLinks />,
  },
};

export const LeftAligned: Story = {
  args: {
    title: "Sign in",
    description: "Access your account dashboard.",
    children: <LoginForm />,
    headerAlignment: "left",
    maxWidth: "sm",
  },
};

export const ExtraLarge: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Enterprise Dashboard",
    subtitle: "Secure Business Portal",
    description:
      "Welcome to your enterprise management console. Please authenticate to continue.",
    children: <SignupForm />,
    maxWidth: "xl",
    cardVariant: "elevated",
    footerContent: (
      <div className="space-y-2">
        <FooterLinks />
        <p className="text-center text-xs text-muted-foreground">
          This is a secure connection. Your data is protected.
        </p>
      </div>
    ),
  },
};

export const MinimalSimple: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Login</h2>
        <Input className="w-full" placeholder="Username" />
        <Input className="w-full" placeholder="Password" type="password" />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </div>
    ),
    maxWidth: "sm",
  },
};

export const AllFeatures: Story = {
  args: {
    logo: <SampleLogo />,
    title: "Complete Experience",
    subtitle: "Full Featured Demo",
    description:
      "This story demonstrates all available features of the AuthLayout component.",
    children: <LoginForm />,
    backgroundVariant: "gradient",
    cardVariant: "glass",
    maxWidth: "lg",
    headerAlignment: "center",
    showBackButton: true,
    onBackClick: () => console.log("Back clicked"),
    footerContent: (
      <div className="space-y-3">
        <FooterLinks />
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>© 2024 Your Company. All rights reserved.</p>
          <p>Protected by industry-standard security.</p>
        </div>
      </div>
    ),
  },
};
