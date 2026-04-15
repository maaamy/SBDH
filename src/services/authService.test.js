import { describe, it, expect, vi, beforeEach } from "vitest";
import * as authService from "./authService";

vi.mock("../utils/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import api from "../utils/api";

const mockUser = {
  user_id: "abc-123",
  email: "test@test.com",
  type: "client",
  nom: "Dupont",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("authService.verifyToken", () => {
  it("retourne user si la requête réussit", async () => {
    api.get.mockResolvedValue({ data: { user: mockUser } });
    const result = await authService.verifyToken();
    expect(result).toEqual(mockUser);
    expect(api.get).toHaveBeenCalledWith("/auth/verify");
  });

  it("lance une erreur si la requête échoue", async () => {
    api.get.mockRejectedValue(new Error("401"));
    await expect(authService.verifyToken()).rejects.toThrow("401");
  });
});

describe("authService.connexionClient", () => {
  it("retourne user si la connexion réussit", async () => {
    api.post.mockResolvedValue({ data: { user: mockUser } });
    const result = await authService.connexionClient({ email: "test@test.com", mdp: "123456" });
    expect(result).toEqual(mockUser);
    expect(api.post).toHaveBeenCalledWith("/auth/connexion-client", { email: "test@test.com", mdp: "123456" });
  });

  it("lance une erreur si la connexion échoue", async () => {
    api.post.mockRejectedValue(new Error("Identifiants incorrects"));
    await expect(authService.connexionClient({ email: "test@test.com", mdp: "wrong" })).rejects.toThrow();
  });
});

describe("authService.connexionEntreprise", () => {
  it("retourne user si la connexion réussit", async () => {
    api.post.mockResolvedValue({ data: { user: { ...mockUser, type: "entreprise" } } });
    const result = await authService.connexionEntreprise({ email: "e@e.com", siret: "12345678901234", mdp: "123456" });
    expect(result.type).toBe("entreprise");
    expect(api.post).toHaveBeenCalledWith("/auth/connexion-entreprise", { email: "e@e.com", siret: "12345678901234", mdp: "123456" });
  });
});

describe("authService.inscriptionClient", () => {
  it("retourne user si l'inscription réussit", async () => {
    api.post.mockResolvedValue({ data: { user: mockUser } });
    const result = await authService.inscriptionClient({ email: "test@test.com", mdp: "123456" });
    expect(result).toEqual(mockUser);
    expect(api.post).toHaveBeenCalledWith("/auth/inscription-client", { email: "test@test.com", mdp: "123456" });
  });
});

describe("authService.inscriptionEntreprise", () => {
  it("retourne user si l'inscription réussit", async () => {
    api.post.mockResolvedValue({ data: { user: { ...mockUser, type: "entreprise" } } });
    const result = await authService.inscriptionEntreprise({ email: "e@e.com", mdp: "123456", siret: "12345678901234" });
    expect(result.type).toBe("entreprise");
    expect(api.post).toHaveBeenCalledWith("/auth/inscription-entreprise", { email: "e@e.com", mdp: "123456", siret: "12345678901234" });
  });
});

describe("authService.connexionClientGoogle", () => {
  it("retourne user si la connexion Google réussit", async () => {
    api.post.mockResolvedValue({ data: { user: mockUser } });
    const result = await authService.connexionClientGoogle({ token: "google-token" });
    expect(result).toEqual(mockUser);
    expect(api.post).toHaveBeenCalledWith("/auth/connexion-client/google", { token: "google-token" });
  });
});

describe("authService.connexionEntrepriseGoogle", () => {
  it("retourne user si la connexion Google entreprise réussit", async () => {
    api.post.mockResolvedValue({ data: { user: { ...mockUser, type: "entreprise" } } });
    const result = await authService.connexionEntrepriseGoogle({ token: "google-token", siret: "12345678901234" });
    expect(result.type).toBe("entreprise");
    expect(api.post).toHaveBeenCalledWith("/auth/connexion-entreprise/google", { token: "google-token", siret: "12345678901234" });
  });
});

describe("authService.logout", () => {
  it("appelle le bon endpoint", async () => {
    api.post.mockResolvedValue({});
    await authService.logout();
    expect(api.post).toHaveBeenCalledWith("/auth/logout");
  });
});
