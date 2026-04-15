import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormInput from "../FormInput";
import { Eye } from "lucide-react";

describe("FormInput", () => {
  it("affiche le label si fourni", () => {
    render(<FormInput label="Email" placeholder="email@test.com" value="" onChange={vi.fn()} />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("n'affiche pas de label si non fourni", () => {
    render(<FormInput placeholder="email@test.com" value="" onChange={vi.fn()} />);
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("affiche le placeholder", () => {
    render(<FormInput placeholder="Votre email" value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Votre email")).toBeInTheDocument();
  });

  it("affiche la valeur passée", () => {
    render(<FormInput placeholder="Email" value="test@test.com" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();
  });

  it("appelle onChange quand on tape", () => {
    const onChange = vi.fn();
    render(<FormInput placeholder="Email" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("affiche le type password quand type='password'", () => {
    render(<FormInput type="password" placeholder="Mot de passe" value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Mot de passe")).toHaveAttribute("type", "password");
  });

  it("affiche l'icône droite et appelle onRightIconClick", () => {
    const onRightIconClick = vi.fn();
    render(
      <FormInput
        placeholder="mdp"
        value=""
        onChange={vi.fn()}
        rightIcon={<span><Eye /></span>}
        onRightIconClick={onRightIconClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onRightIconClick).toHaveBeenCalledTimes(1);
  });
});
