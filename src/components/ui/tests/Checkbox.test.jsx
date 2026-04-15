import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("affiche le label", () => {
    render(<Checkbox label="Nike" checked={false} onChange={vi.fn()} />);
    expect(screen.getByText("Nike")).toBeInTheDocument();
  });

  it("est coché quand checked=true", () => {
    render(<Checkbox label="Nike" checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("n'est pas coché quand checked=false", () => {
    render(<Checkbox label="Nike" checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("appelle onChange au clic", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Nike" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
