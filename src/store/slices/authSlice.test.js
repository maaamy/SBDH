import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  connexionClient,
  connexionEntreprise,
  inscriptionClient,
  inscriptionEntreprise,
  verifyToken,
  logout,
  selectUser,
} from "./authSlice";

vi.mock("../../services/authService", () => ({
  verifyToken: vi.fn(),
  connexionClient: vi.fn(),
  connexionEntreprise: vi.fn(),
  inscriptionClient: vi.fn(),
  inscriptionEntreprise: vi.fn(),
  connexionClientGoogle: vi.fn(),
  connexionEntrepriseGoogle: vi.fn(),
  logout: vi.fn(),
}));

import * as authService from "../../services/authService";

const mockUser = {
  user_id: "abc-123",
  email: "test@test.com",
  type: "client",
  nom: "Dupont",
};

const createStore = () =>
  configureStore({ reducer: { auth: authReducer } });

describe("authSlice : état initial", () => {
  it("a le bon état initial", () => {
    const store = createStore();
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
});

describe("verifyToken", () => {
  it("fulfilled : met à jour user et isAuthenticated", async () => {
    authService.verifyToken.mockResolvedValue(mockUser);
    const store = createStore();
    await store.dispatch(verifyToken());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ user_id: "abc-123", email: "test@test.com", type: "client", nom: "Dupont" });
    expect(state.isLoading).toBe(false);
  });

  it("rejected : isAuthenticated reste false", async () => {
    authService.verifyToken.mockRejectedValue({ response: { data: { error: "Token invalide" } } });
    const store = createStore();
    await store.dispatch(verifyToken());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});


describe("connexionClient", () => {
  it("fulfilled : connecte l'utilisateur", async () => {
    authService.connexionClient.mockResolvedValue(mockUser);
    const store = createStore();
    await store.dispatch(connexionClient({ email: "test@test.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.email).toBe("test@test.com");
    expect(state.user.nom).toBe("Dupont");
    expect(state.isLoading).toBe(false);
  });

  it("rejected : stocke l'erreur", async () => {
    authService.connexionClient.mockRejectedValue({ response: { data: { error: "Email ou mot de passe incorrect" } } });
    const store = createStore();
    await store.dispatch(connexionClient({ email: "test@test.com", mdp: "wrong" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe("Email ou mot de passe incorrect");
  });

  it("pending : isLoading=true et error=null", () => {
    authService.connexionClient.mockReturnValue(new Promise(() => {}));
    const store = createStore();
    store.dispatch(connexionClient({ email: "test@test.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
});

describe("connexionEntreprise", () => {
  it("fulfilled : connecte l'entreprise", async () => {
    authService.connexionEntreprise.mockResolvedValue({ ...mockUser, type: "entreprise" });
    const store = createStore();
    await store.dispatch(connexionEntreprise({ email: "e@e.com", siret: "12345678901234", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.type).toBe("entreprise");
  });

  it("rejected : stocke l'erreur", async () => {
    authService.connexionEntreprise.mockRejectedValue({ response: { data: { error: "Identifiants incorrects" } } });
    const store = createStore();
    await store.dispatch(connexionEntreprise({ email: "e@e.com", siret: "12345678901234", mdp: "wrong" }));
    const state = store.getState().auth;
    expect(state.error).toBe("Identifiants incorrects");
    expect(state.isAuthenticated).toBe(false);
  });
});

describe("inscriptionClient", () => {
  it("fulfilled : inscrit et connecte le client", async () => {
    authService.inscriptionClient.mockResolvedValue(mockUser);
    const store = createStore();
    await store.dispatch(inscriptionClient({ email: "test@test.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.email).toBe("test@test.com");
  });

  it("rejected : stocke l'erreur", async () => {
    authService.inscriptionClient.mockRejectedValue({ response: { data: { error: "Email déjà utilisé" } } });
    const store = createStore();
    await store.dispatch(inscriptionClient({ email: "test@test.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.error).toBe("Email déjà utilisé");
    expect(state.isAuthenticated).toBe(false);
  });
});

describe("inscriptionEntreprise", () => {
  it("fulfilled : inscrit et connecte l'entreprise", async () => {
    authService.inscriptionEntreprise.mockResolvedValue({ ...mockUser, type: "entreprise" });
    const store = createStore();
    await store.dispatch(inscriptionEntreprise({ email: "e@e.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.type).toBe("entreprise");
  });

  it("rejected : stocke l'erreur", async () => {
    authService.inscriptionEntreprise.mockRejectedValue({ response: { data: { error: "SIRET invalide" } } });
    const store = createStore();
    await store.dispatch(inscriptionEntreprise({ email: "e@e.com", mdp: "123456" }));
    const state = store.getState().auth;
    expect(state.error).toBe("SIRET invalide");
  });
});

describe("logout", () => {
  it("fulfilled : déconnecte l'utilisateur", async () => {
    authService.logout.mockResolvedValue();
    authService.connexionClient.mockResolvedValue(mockUser);
    const store = createStore();
    await store.dispatch(connexionClient({ email: "test@test.com", mdp: "123456" }));
    expect(store.getState().auth.isAuthenticated).toBe(true);
    await store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});

describe("selectUser", () => {
  it("retourne null par défaut", () => {
    const store = createStore();
    expect(selectUser(store.getState())).toBeNull();
  });

  it("retourne l'utilisateur connecté", async () => {
    authService.connexionClient.mockResolvedValue(mockUser);
    const store = createStore();
    await store.dispatch(connexionClient({ email: "test@test.com", mdp: "123456" }));
    expect(selectUser(store.getState())).toEqual({
      user_id: "abc-123",
      email: "test@test.com",
      type: "client",
      nom: "Dupont",
    });
  });
});
