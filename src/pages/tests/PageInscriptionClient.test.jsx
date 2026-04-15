import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/slices/authSlice";
import PageInscriptionClient from "../PageInscriptionClient";

vi.mock("../../services/authService", () => ({
  inscriptionClient: vi.fn()
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
       <PageInscriptionClient />
      </MemoryRouter>
    </Provider>
  );

const fillForm = (nom, prenom, jour, mois, annee, adresse1, ville, codePostal, pays, email, mdp, confirm) => {
  fireEvent.change(screen.getByPlaceholderText("Dupont"), {
    target: { value: nom },
  });
  fireEvent.change(screen.getByPlaceholderText("Jean"), {
    target: { value: prenom },
  });
  fireEvent.change(screen.getByPlaceholderText("JJ"), {
    target: { value: jour },
  });
  fireEvent.change(screen.getByPlaceholderText("MM"), {
    target: { value: mois },
  });
  fireEvent.change(screen.getByPlaceholderText("AAAA"), {
    target: { value: annee },
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


describe("PageInscriptionClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche le titre 'Inscription Client'", () => {
    renderWithStore();
    expect(screen.getByText("Inscription Client")).toBeInTheDocument();
  });

  it("affiche le champ Nom", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("Dupont")).toBeInTheDocument();
  });

  it("affiche le champ Prénom", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("Jean")).toBeInTheDocument();
  });

  it("affiche les champs date de naissance (JJ, MM, AAAA)", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("JJ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("AAAA")).toBeInTheDocument();
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
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));
    expect(await screen.findByText(/Nom invalide/i)).toBeInTheDocument();
  });

  it("met à jour le champ email quand un email est mis", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("exemple@gmail.com");
    fireEvent.change(input, { target: { value: "john@gmail.com" } });
    expect(input).toHaveValue("john@gmail.com");
  });

  it("navigue vers /catalogue si inscription réussie", async () => {
    authService.inscriptionClient.mockResolvedValue({
      user_id: "abc",
      email: "john@gmail.com",
      type: "client",
      nom: "Dupont",
    });

    renderWithStore();
    fillForm("Dupont","Jean",2,5,2020,"5 rue","Paris",75000,"France","john@gmail.com", "secret123","secret123");
    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/catalogue");
    });
  });

  it("affiche l'erreur du serveur si connexion échouée", async () => {
      authService.inscriptionClient.mockRejectedValue({
        response: { data: { error: "Inscription non valide" } },
      });
  
      renderWithStore();
      fillForm("Dupont","Jean",2,5,2020,"5 rue","Paris",75000,"France","john@gmail.com", "secret123","secret123");
      fireEvent.click(screen.getByText("S'inscrire"));
  
      await waitFor(() => {
        expect(screen.getByText("Inscription non valide")).toBeInTheDocument();
      });
    });
    
     

  
});
