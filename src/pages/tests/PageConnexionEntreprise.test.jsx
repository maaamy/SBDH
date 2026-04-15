import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach} from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/slices/authSlice";
import PageConnexionEntreprise from "../PageConnexionEntreprise";

vi.mock("../../services/authService", () => ({
  connexionEntreprise: vi.fn(),
  connexionEntrepriseGoogle: vi.fn(),
}));

import * as authService from "../../services/authService";

const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("@react-oauth/google", () => ({
  GoogleLogin: ({ onSuccess, onError }) => (
    <>
      <button onClick={() => onSuccess({ credential: "fake-token" })}>Google Login Success</button>
      <button onClick={() => onError()}>Google Login Error</button>
    </>
  ),
}));

const createStore = () =>
  configureStore({ reducer: { auth: authReducer } });

const renderWithStore = () =>
  render(
    <Provider store={createStore()}>
      <MemoryRouter>
        <PageConnexionEntreprise />
      </MemoryRouter>
    </Provider>
  );

const fillForm = (email, siret, mdp) => {
  fireEvent.change(screen.getByPlaceholderText("exemple@gmail.com"), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText("00000000000000000000"), {
    target: { value: siret },
  });
  fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
    target: { value: mdp },
  });
};


describe("PageConnexionEntreprise", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le titre 'Connexion Entreprise'", () => {
    renderWithStore();
    expect(screen.getByText("Connexion Entreprise")).toBeInTheDocument();
  });

  it("affiche le champ email", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("exemple@gmail.com")).toBeInTheDocument();
  });

  it("affiche le champ SIRET", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("00000000000000000000")).toBeInTheDocument();
  });

  it("affiche le champ mot de passe", () => {
    renderWithStore();
    expect(screen.getAllByPlaceholderText("••••••••")[0]).toBeInTheDocument();
  });

  it("affiche le message si SIRET invalide pour Google", () => {
    renderWithStore();
    expect(screen.getByText(/renseigner votre SIRET/i)).toBeInTheDocument();
  });

  it("cache le message SIRET quand le SIRET est valide (14 chiffres)", () => {
    renderWithStore();
    const siretInput = screen.getByPlaceholderText("00000000000000000000");
    fireEvent.change(siretInput, { target: { value: "12345678901234" } });
    expect(screen.queryByText(/renseigner votre SIRET/i)).not.toBeInTheDocument();
  });

  it("affiche le composant Google Login", () => {
      renderWithStore();
      expect(screen.getByText("Google Login Success")).toBeInTheDocument();
  });

  it("navigue vers '/' au clic sur Accueil", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Accueil"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigue vers /reinitialisation/email au clic sur 'Mot de passe oublié ?'", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Mot de passe oublié ?"));
    expect(mockNavigate).toHaveBeenCalledWith("/reinitialisation/email");
  });

  it("navigue vers /inscription/entreprise au clic sur 'S'inscrire'", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("S'inscrire"));
    expect(mockNavigate).toHaveBeenCalledWith("/inscription/entreprise");
  });

  it("met à jour le champ email quand un email est mis", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("exemple@gmail.com");
    fireEvent.change(input, { target: { value: "john@gmail.com" } });
    expect(input).toHaveValue("john@gmail.com");
  });

  it("met à jour le champ mot de passe quand le mot de passe est mis", () => {
    renderWithStore();
    const input = screen.getAllByPlaceholderText("••••••••")[0];
    fireEvent.change(input, { target: { value: "secret123" } });
    expect(input).toHaveValue("secret123");
  });

  it("affiche une erreur si formulaire vide", async () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Se connecter →"));
    expect(await screen.findByText("Veuillez saisir un email valide.")).toBeInTheDocument();
  });

  it("navigue vers / si connexion réussie", async () => {
    authService.connexionEntreprise.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "entreprise",
      nom: "Dupont",
      siret: "12345678912345"
    });

    renderWithStore();
    fillForm("john@gmail.com",12345678912345, "secret123");
    fireEvent.click(screen.getByText("Se connecter →"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("affiche l'erreur du serveur si connexion échouée", async () => {
    authService.connexionEntreprise.mockRejectedValue({
      response: { data: { error: "Identifiants incorrects" } },
    });

    renderWithStore();
    fillForm("john@gmail.com", 12345678912345, "mauvaismdp");
    fireEvent.click(screen.getByText("Se connecter →"));

    await waitFor(() => {
      expect(screen.getByText("Identifiants incorrects")).toBeInTheDocument();
    });
  });

  
  it("navigue vers / si Google connexion réussie", async () => {
    authService.connexionEntrepriseGoogle.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "entreprise",
      nom: "Dupont",
      siret: 12345678912345,
    });

    renderWithStore();
    fireEvent.click(screen.getByText("Google Login Success"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("affiche erreur si callback onError déclenché", async () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Google Login Error"));

    expect(await screen.findByText("Erreur lors de la connexion Google.")).toBeInTheDocument();
  });
  
});
