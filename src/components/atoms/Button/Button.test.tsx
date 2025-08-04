/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("applies the correct variant classes", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  it("applies the correct size classes", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-11", "px-8");
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("forwards refs correctly", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button with ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
