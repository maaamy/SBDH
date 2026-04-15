import { describe, it, expect } from "vitest";
import {
  validationConnexionCLientForm,
  validationConnexionEntrepriseForm,
  validateInscriptionClientForm,
  validationInscriptionEntrepriseForm,
} from "./validation";

describe("validationConnexionCLientForm", () => {
  it("retourne null si le formulaire est valide", () => {
    expect(validationConnexionCLientForm({ email: "test@test.com", mdp: "123456" })).toBeNull();
  });

  it("retourne une erreur si email vide", () => {
    expect(validationConnexionCLientForm({ email: "", mdp: "123456" })).toBe("Veuillez saisir un email valide.");
  });

  it("retourne une erreur si email invalide", () => {
    expect(validationConnexionCLientForm({ email: "pasunemail", mdp: "123456" })).toBe("Veuillez saisir un email valide.");
  });

  it("retourne une erreur si mot de passe vide", () => {
    expect(validationConnexionCLientForm({ email: "test@test.com", mdp: "" })).toBe("Veuillez saisir un mot de passe.");
  });
});



describe("validationConnexionEntrepriseForm", () => {
  const validForm = { email: "test@test.com", siret: "12345678901234", mdp: "123456" };

  it("retourne null si le formulaire est valide", () => {
    expect(validationConnexionEntrepriseForm(validForm)).toBeNull();
  });

  it("retourne une erreur si email invalide", () => {
    expect(validationConnexionEntrepriseForm({ ...validForm, email: "pasunemail" })).toBe("Veuillez saisir un email valide.");
  });

  it("retourne une erreur si siret vide", () => {
    expect(validationConnexionEntrepriseForm({ ...validForm, siret: "" })).toBe("Veuillez saisir un n° siret valide.");
  });

  it("retourne une erreur si siret contient des lettres", () => {
    expect(validationConnexionEntrepriseForm({ ...validForm, siret: "ABCDE" })).toBe("Veuillez saisir un n° siret valide.");
  });

  it("retourne une erreur si mot de passe vide", () => {
    expect(validationConnexionEntrepriseForm({ ...validForm, mdp: "" })).toBe("Veuillez saisir un mot de passe.");
  });
});



describe("validateInscriptionClientForm", () => {
  const validForm = {
    nom: "Dupont",
    prenom: "Jean",
    jour: "15",
    mois: "06",
    annee: "1990",
    adresse1: "12 rue de la Paix",
    adresse2: "",
    ville: "Paris",
    codePostal: "75001",
    pays: "France",
    email: "jean@test.com",
    mdp: "motdepasse123",
    confirm: "motdepasse123",
  };

  it("retourne null si le formulaire est valide", () => {
    expect(validateInscriptionClientForm(validForm)).toBeNull();
  });

  it("retourne une erreur si nom vide", () => {
    expect(validateInscriptionClientForm({ ...validForm, nom: "" })).toBe("Nom invalide (pas de chiffres).");
  });

  it("retourne une erreur si nom contient des chiffres", () => {
    expect(validateInscriptionClientForm({ ...validForm, nom: "Dupont123" })).toBe("Nom invalide (pas de chiffres).");
  });

  it("retourne une erreur si prénom contient des chiffres", () => {
    expect(validateInscriptionClientForm({ ...validForm, prenom: "Jean2" })).toBe("Prénom invalide (pas de chiffres).");
  });

  it("retourne une erreur si jour manquant", () => {
    expect(validateInscriptionClientForm({ ...validForm, jour: "" })).toBe("Veuillez renseigner votre date de naissance.");
  });

  it("retourne une erreur si jour invalide > 31", () => {
    expect(validateInscriptionClientForm({ ...validForm, jour: "32" })).toBe("Jour invalide (1-31).");
  });

  it("retourne une erreur si mois invalide > 12", () => {
    expect(validateInscriptionClientForm({ ...validForm, mois: "13" })).toBe("Mois invalide (1-12).");
  });

  it("retourne une erreur si année invalide", () => {
    expect(validateInscriptionClientForm({ ...validForm, annee: "1800" })).toBe("Année invalide.");
  });

  it("retourne une erreur si adresse incomplète", () => {
    expect(validateInscriptionClientForm({ ...validForm, ville: "" })).toBe("Veuillez renseigner votre adresse complète.");
  });

  it("retourne une erreur si ville contient des chiffres", () => {
    expect(validateInscriptionClientForm({ ...validForm, ville: "Paris75" })).toBe("Ville invalide (pas de chiffres).");
  });

  it("retourne une erreur si code postal invalide", () => {
    expect(validateInscriptionClientForm({ ...validForm, codePostal: "ABCDE" })).toBe("Code postal invalide (seulement des chiffres).");
  });

  it("retourne une erreur si email invalide", () => {
    expect(validateInscriptionClientForm({ ...validForm, email: "pasunemail" })).toBe("Veuillez saisir un email valide.");
  });

  it("retourne une erreur si mot de passe trop court", () => {
    expect(validateInscriptionClientForm({ ...validForm, mdp: "123", confirm: "123" })).toBe("Le mot de passe doit faire au moins 6 caractères.");
  });

  it("retourne une erreur si mots de passe différents", () => {
    expect(validateInscriptionClientForm({ ...validForm, mdp: "password1", confirm: "password2" })).toBe("Les mots de passe ne correspondent pas.");
  });
});



describe("validationInscriptionEntrepriseForm", () => {
  const validForm = {
    nomEntreprise: "Ma Société",
    siret: "12345678901234",
    adresse1: "12 rue de la Paix",
    adresse2: "",
    ville: "Paris",
    codePostal: "75001",
    pays: "France",
    email: "contact@societe.com",
    mdp: "motdepasse123",
    confirm: "motdepasse123",
  };

  it("retourne null si le formulaire est valide", () => {
    expect(validationInscriptionEntrepriseForm(validForm)).toBeNull();
  });

  it("retourne une erreur si nom entreprise vide", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, nomEntreprise: "" })).toBe("Veuillez renseigner le nom de votre entreprise.");
  });

  it("retourne une erreur si siret vide", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, siret: "" })).toBe("N° siret invalide (seulement des chiffres).");
  });

  it("retourne une erreur si siret contient des lettres", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, siret: "ABCDEFGH" })).toBe("N° siret invalide (seulement des chiffres).");
  });

  it("retourne une erreur si adresse incomplète", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, pays: "" })).toBe("Veuillez renseigner votre adresse complète.");
  });

  it("retourne une erreur si ville contient des chiffres", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, ville: "Paris75" })).toBe("Ville invalide (pas de chiffres).");
  });

  it("retourne une erreur si code postal invalide", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, codePostal: "ABCDE" })).toBe("Code postal invalide (seulement des chiffres).");
  });

  it("retourne une erreur si email invalide", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, email: "pasunemail" })).toBe("Veuillez saisir un email valide.");
  });

  it("retourne une erreur si mot de passe trop court", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, mdp: "123", confirm: "123" })).toBe("Le mot de passe doit faire au moins 6 caractères.");
  });

  it("retourne une erreur si mots de passe différents", () => {
    expect(validationInscriptionEntrepriseForm({ ...validForm, mdp: "password1", confirm: "password2" })).toBe("Les mots de passe ne correspondent pas.");
  });
});
