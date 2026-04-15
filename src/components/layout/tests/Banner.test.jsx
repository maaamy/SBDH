import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Banner from "../Banner";

describe("Banner", () => {
  it("affiche l'image de bannière", () => {
    render(<Banner />);
    const img = screen.getByAltText("bannière");
    expect(img).toBeInTheDocument();
  }); 
});
