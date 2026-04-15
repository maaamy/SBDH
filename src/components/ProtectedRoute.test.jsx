import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProtectedRoute from "./ProtectedRoute";

const createMockStore = (authState) =>
  configureStore({
    reducer: {
      auth: () => authState,
    },
  });

const renderWithStore = (authState, allowedTypes = ["client"]) => {
  const store = createMockStore(authState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/catalogue"]}>
        <Routes>
          <Route path="/connexion" element={<div>Page Connexion</div>} />
          <Route path="/" element={<div>Page Accueil</div>} />
          <Route element={<ProtectedRoute allowedTypes={allowedTypes} />}>
            <Route path="/catalogue" element={<div>Page Catalogue</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("ProtectedRoute", () => {
  it("affiche 'Chargement...' quand isLoading=true", () => {
    renderWithStore({ isLoading: true, isAuthenticated: false, user: null });
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("redirige vers /connexion si non authentifié", () => {
    renderWithStore({ isLoading: false, isAuthenticated: false, user: null });
    expect(screen.getByText("Page Connexion")).toBeInTheDocument();
  });

  it("redirige vers / si le type n'est pas autorisé", () => {
    renderWithStore(
      { isLoading: false, isAuthenticated: true, user: { type: "entreprise" } },
      ["client"]
    );
    expect(screen.getByText("Page Accueil")).toBeInTheDocument();
  });

  it("affiche la page si authentifié et type autorisé", () => {
    renderWithStore(
      { isLoading: false, isAuthenticated: true, user: { type: "client" } },
      ["client"]
    );
    expect(screen.getByText("Page Catalogue")).toBeInTheDocument();
  });

  it("autorise plusieurs types", () => {
    renderWithStore(
      { isLoading: false, isAuthenticated: true, user: { type: "entreprise" } },
      ["client", "entreprise"]
    );
    expect(screen.getByText("Page Catalogue")).toBeInTheDocument();
  });
});
