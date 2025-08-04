import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders with image when src is provided", () => {
    render(<Avatar src="test-image.jpg" alt="Test User" />);
    const image = screen.getByAltText("Test User");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders fallback when no src is provided", () => {
    render(<Avatar fallback="TU" alt="Test User" />);
    expect(screen.getByText("TU")).toBeInTheDocument();
  });

  it("renders first letter of alt as fallback when no fallback is provided", () => {
    render(<Avatar alt="Test User" />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("applies the correct size classes", () => {
    const { container } = render(<Avatar size="lg" fallback="TU" />);
    expect(container.firstChild).toHaveClass("h-12", "w-12");
  });

  it("handles image load errors", () => {
    render(<Avatar src="broken-image.jpg" fallback="TU" />);
    // Simulate image error
    const image = screen.getByAltText("Avatar");
    fireEvent.error(image);
    expect(screen.getByText("TU")).toBeInTheDocument();
  });
});
