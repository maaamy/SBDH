import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RoleCard from "../RoleCard";

describe("RoleCard", () => {
  const defaultProps = {
    title: "Client",
    primaryLabel: "Se connecter",
    primaryAction: vi.fn(),
    secondaryLabel: "S'inscrire",
    secondaryAction: vi.fn(),
    linkLabel: "Mot de passe oublié ?",
    linkAction: vi.fn(),
  };

  it("affiche le titre", () => {
    render(<RoleCard {...defaultProps} />);
    expect(screen.getByText("Client")).toBeInTheDocument();
  });

  it("affiche le bouton primaire", () => {
    render(<RoleCard {...defaultProps} />);
    expect(screen.getByText("Se connecter →")).toBeInTheDocument();
  });

  it("affiche le bouton secondaire", () => {
    render(<RoleCard {...defaultProps} />);
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  it("affiche le lien", () => {
    render(<RoleCard {...defaultProps} />);
    expect(screen.getByText("Mot de passe oublié ?")).toBeInTheDocument();
  });

  it("appelle primaryAction au clic sur le bouton primaire", () => {
    const primaryAction = vi.fn();
    render(<RoleCard {...defaultProps} primaryAction={primaryAction} />);
    fireEvent.click(screen.getByText("Se connecter →"));
    expect(primaryAction).toHaveBeenCalledTimes(1);
  });

  it("appelle secondaryAction au clic sur le bouton secondaire", () => {
    const secondaryAction = vi.fn();
    render(<RoleCard {...defaultProps} secondaryAction={secondaryAction} />);
    fireEvent.click(screen.getByText("S'inscrire"));
    expect(secondaryAction).toHaveBeenCalledTimes(1);
  });

  it("appelle linkAction au clic sur le lien", () => {
    const linkAction = vi.fn();
    render(<RoleCard {...defaultProps} linkAction={linkAction} />);
    fireEvent.click(screen.getByText("Mot de passe oublié ?"));
    expect(linkAction).toHaveBeenCalledTimes(1);
  });
});
