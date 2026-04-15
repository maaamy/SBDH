import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/slices/authSlice";
import PageConnexionClient from "../PageConnexionClient";

vi.mock("../../services/authService", () => ({
  connexionClient: vi.fn(),
  connexionClientGoogle: vi.fn(),
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
        <PageConnexionClient />
      </MemoryRouter>
    </Provider>
  );

const fillForm = (email, mdp) => {
  fireEvent.change(screen.getByPlaceholderText("exemple@gmail.com"), {
    target: { value: email },
  });
  fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
    target: { value: mdp },
  });
};

describe("PageConnexionClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le titre 'Connexion Client'", () => {
    renderWithStore();
    expect(screen.getByText("Connexion Client")).toBeInTheDocument();
  });

  it("affiche le champ email", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("exemple@gmail.com")).toBeInTheDocument();
  });

  it("affiche le champ mot de passe", () => {
    renderWithStore();
    expect(screen.getAllByPlaceholderText("••••••••")[0]).toBeInTheDocument();
  });

  it("affiche le bouton 'Se connecter'", () => {
    renderWithStore();
    expect(screen.getByText("Se connecter →")).toBeInTheDocument();
  });

  it("affiche le bouton 'S'inscrire'", () => {
    renderWithStore();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
  });

  it("affiche 'Mot de passe oublié ?'", () => {
    renderWithStore();
    expect(screen.getByText("Mot de passe oublié ?")).toBeInTheDocument();
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

  it("navigue vers /inscription/client au clic sur 'S'inscrire'", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("S'inscrire"));
    expect(mockNavigate).toHaveBeenCalledWith("/inscription/client");
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

  it("navigue vers /catalogue si connexion réussie", async () => {
    authService.connexionClient.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "client",
      nom: "Dupont",
    });

    renderWithStore();
    fillForm("john@gmail.com", "secret123");
    fireEvent.click(screen.getByText("Se connecter →"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/catalogue");
    });
  });

  it("affiche l'erreur du serveur si connexion échouée", async () => {
    authService.connexionClient.mockRejectedValue({
      response: { data: { error: "Email ou mot de passe incorrect" } },
    });

    renderWithStore();
    fillForm("john@gmail.com", "mauvaismdp");
    fireEvent.click(screen.getByText("Se connecter →"));

    await waitFor(() => {
      expect(screen.getByText("Email ou mot de passe incorrect")).toBeInTheDocument();
    });
  });

 
  it("navigue vers /catalogue si Google connexion réussie", async () => {
    authService.connexionClientGoogle.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "client",
      nom: "Dupont",
    });

    renderWithStore();
    fireEvent.click(screen.getByText("Google Login Success"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/catalogue");
    });
  });

  it("affiche erreur si callback onError déclenché", async () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Google Login Error"));

    expect(await screen.findByText("Erreur lors de la connexion Google.")).toBeInTheDocument();
  });

});