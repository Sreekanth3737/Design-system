import type { Meta } from "@storybook/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./Modal";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import React from "react";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

export const Basic = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Basic Dialog</DialogTitle>
        <DialogDescription>
          A simple dialog with title and description.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p>This is the main content of the dialog.</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Save Changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Sizes = () => (
  <div className="flex gap-4">
    {["sm", "md", "lg", "xl", "2xl", "full"].map((size) => (
      <Dialog key={size}>
        <DialogTrigger asChild>
          <Button>{size} Size</Button>
        </DialogTrigger>
        <DialogContent size={size as any}>
          <DialogHeader>
            <DialogTitle>{size} Size</DialogTitle>
            <DialogDescription>
              This dialog uses the {size} size variant.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ))}
  </div>
);

export const WithLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Loading Dialog</Button>
      </DialogTrigger>
      <DialogContent loading={isLoading}>
        <DialogHeader>
          <DialogTitle>Loading State</DialogTitle>
          <DialogDescription>
            This dialog demonstrates a loading state.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Click the button below to simulate a loading state.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAction} disabled={isLoading}>
            {isLoading ? "Processing..." : "Start Loading"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const WithForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login Form</Button>
      </DialogTrigger>
      <DialogContent loading={isLoading}>
        <DialogHeader>
          <DialogTitle>Login Form</DialogTitle>
          <DialogDescription>
            Enter your credentials to log in.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const WithAnimations = () => {
  const [selectedAnimation, setSelectedAnimation] = React.useState<string>("default");

  const animations = {
    default: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    },
    slideUp: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-48 data-[state=open]:slide-in-from-bottom-48"
    },
    slideLeft: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-48 data-[state=open]:slide-in-from-right-48"
    },
    bounce: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-300 data-[state=open]:animate-bounce"
    },
    scale: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-50 data-[state=open]:zoom-in-50 data-[state=open]:duration-200"
    },
    flip: {
      overlay: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:duration-500"
    }
  };

  const AnimatedDialog = ({ animation, title, description }: { animation: keyof typeof animations, title: string, description: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent 
        animation={animation}
        className="animate-none" // Reset default animations
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This modal demonstrates the {animation} animation style.</p>
          <p className="mt-2 text-sm text-gray-600">
            The animation affects how the modal appears and disappears.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <AnimatedDialog
        animation="default"
        title="Default Animation"
        description="Standard fade and zoom animation"
      />
      <AnimatedDialog
        animation="slideUp"
        title="Slide Up"
        description="Slides up from the bottom"
      />
      <AnimatedDialog
        animation="slideLeft"
        title="Slide Left"
        description="Slides in from the right"
      />
      <AnimatedDialog
        animation="bounce"
        title="Bounce Effect"
        description="Bounces on appearance"
      />
      <AnimatedDialog
        animation="scale"
        title="Scale Effect"
        description="Scales from smaller size"
      />
      <AnimatedDialog
        animation="flip"
        title="Flip Effect"
        description="Flips with slower duration"
      />
    </div>
  );
};

export const WithStaggeredAnimations = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Staggered Animations</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="animate-in fade-in-0 slide-in-from-top-4 duration-300">
            Staggered Animation Demo
          </DialogTitle>
          <DialogDescription className="animate-in fade-in-0 slide-in-from-top-4 duration-300 delay-100">
            Each element animates in sequence for a smooth effect.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-200">
            <p>This paragraph slides in from the left.</p>
          </div>
          <div className="animate-in fade-in-0 slide-in-from-right-4 duration-300 delay-300">
            <p>This one slides in from the right.</p>
          </div>
          <div className="animate-in fade-in-0 zoom-in-50 duration-300 delay-400">
            <p>And this one zooms in last.</p>
          </div>
        </div>
        <DialogFooter className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-500">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const WithCustomAnimations = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Custom Animations</Button>
      </DialogTrigger>
      <DialogContent className="animate-none">
        <div className="animate-in fade-in-0 duration-700 ease-out">
          <DialogHeader>
            <DialogTitle className="animate-in slide-in-from-top-2 duration-500 delay-200">
              Custom Animation Timing
            </DialogTitle>
            <DialogDescription className="animate-in slide-in-from-top-2 duration-500 delay-300">
              This modal uses custom animation durations and delays.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-600 delay-400">
            <p>Content appears with custom timing curves.</p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded animate-in zoom-in-50 duration-400 delay-600">
              <p className="text-sm">This card has its own animation delay.</p>
            </div>
          </div>
          <DialogFooter className="animate-in slide-in-from-bottom-4 duration-400 delay-700">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button>Save</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};