import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../store/slices/authSlice";
import PageInscriptionEntreprise from "../PageInscriptionEntreprise";


vi.mock("../../services/authService", () => ({
  inscriptionEntreprise: vi.fn()
}));

import * as authService from "../../services/authService";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const createStore = () =>
  configureStore({ reducer: { auth: authReducer } });

const renderWithStore = () =>
  render(
    <Provider store={createStore()}>
      <MemoryRouter>
       <PageInscriptionEntreprise />
      </MemoryRouter>
    </Provider>
  );

const fillForm = (nom, siret, adresse1, ville, codePostal, pays, email, mdp, confirm) => {
  fireEvent.change(screen.getByPlaceholderText("Ma Société"), {
    target: { value: nom },
  });
  fireEvent.change(screen.getByPlaceholderText("00000000000000"), {
    target: { value: siret },
  });
  fireEvent.change(screen.getByPlaceholderText("Adresse Rue"), {
    target: { value: adresse1 },
  });
  fireEvent.change(screen.getByPlaceholderText("Ville"), {
    target: { value: ville },
  });
  fireEvent.change(screen.getByPlaceholderText("Code postal"), {
    target: { value: codePostal },
  });
  fireEvent.change(screen.getByPlaceholderText("Pays"), {
    target: { value: pays },
  });
  fireEvent.change(screen.getByPlaceholderText("exemple@gmail.com"), {
    target: { value: email },
  });
  fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
    target: { value: mdp },
  });
  fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
    target: { value: confirm },
  });
};

describe("PageInscriptionEntreprise", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it("affiche le titre 'Inscription Entreprise'", () => {
    renderWithStore();
    expect(screen.getByText("Inscription Entreprise")).toBeInTheDocument();
  });

  it("affiche le champ nom de l'entreprise", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("Ma Société")).toBeInTheDocument();
  });

  it("affiche le champ SIRET", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("00000000000000")).toBeInTheDocument();
  });

  it("affiche le champ email", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("exemple@gmail.com")).toBeInTheDocument();
  });

  it("affiche les champs mot de passe et confirmation", () => {
    renderWithStore();
    expect(screen.getAllByPlaceholderText("••••••••")).toHaveLength(2);
  });

  it("affiche le bouton S'inscrire", () => {
    renderWithStore();
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it("navigue vers / au clic sur Accueil", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Accueil").closest("button"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("affiche une erreur si soumis vide", async () => {
    renderWithStore();
    fireEvent.click(screen.getByRole("button", { name: /S'inscrire/i }));
    expect(await screen.findByText(/Veuillez renseigner le nom de votre entreprise/)).toBeInTheDocument();
  });

   it("met à jour le champ email quand un email est mis", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("exemple@gmail.com");
    fireEvent.change(input, { target: { value: "john@gmail.com" } });
    expect(input).toHaveValue("john@gmail.com");
  });

  it("navigue vers / si inscription réussie", async () => {
    authService.inscriptionEntreprise.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "entreprise",
      nom: "societe",
      siret: 12345678912345
    });

    renderWithStore();
    fillForm("societe",12345678912345,"5 rue","Paris",75000,"France","john@gmail.com", "secret123","secret123");
    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("affiche l'erreur du serveur si connexion échouée", async () => {
      authService.inscriptionEntreprise.mockRejectedValue({
        response: { data: { error: "Inscription non valide" } },
      });
  
      renderWithStore();
      fillForm("societe",12345678912345,"5 rue","Paris",75000,"France","john@gmail.com", "secret123","secret123");
      fireEvent.click(screen.getByText("S'inscrire"));
  
      await waitFor(() => {
        expect(screen.getByText("Inscription non valide")).toBeInTheDocument();
      });
    });
      
       
});
