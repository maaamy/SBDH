const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpRegex = /^[0-9]+$/;
const noNumberRegex = /^[^\d]+$/;

export const validationConnexionCLientForm = (form) => {
  
    if (!form.email.trim() || !emailRegex.test(form.email))
        return "Veuillez saisir un email valide.";

    if (!form.mdp) return "Veuillez saisir un mot de passe.";

    return null;
};

export const validationConnexionEntrepriseForm = (form) => {

    if (!form.email.trim() || !emailRegex.test(form.email))
      return "Veuillez saisir un email valide.";

   
    if (!form.siret.trim() || !cpRegex.test(form.siret))
      return "Veuillez saisir un n° siret valide.";

    if (!form.mdp) return "Veuillez saisir un mot de passe.";

    return null;
};


export const validateInscriptionClientForm = (form) => {

   
    if (!form.nom.trim() || !noNumberRegex.test(form.nom))
      return "Nom invalide (pas de chiffres).";

    if (!form.prenom.trim() || !noNumberRegex.test(form.prenom))
      return "Prénom invalide (pas de chiffres).";

    const jour = parseInt(form.jour, 10);
    const mois = parseInt(form.mois, 10);
    const annee = parseInt(form.annee, 10);

    if (!jour || !mois || !annee) return "Veuillez renseigner votre date de naissance.";
    if (jour < 1 || jour > 31) return "Jour invalide (1-31).";
    if (mois < 1 || mois > 12) return "Mois invalide (1-12).";
    if (form.annee.length !== 4 || annee < 1900 || annee > new Date().getFullYear())
      return "Année invalide.";


    const date = new Date(`${annee}-${mois}-${jour}`);
    if (
      date.getFullYear() !== annee ||
      date.getMonth() + 1 !== mois ||
      date.getDate() !== jour
    ) return "Date de naissance invalide.";

   
    if (!form.adresse1.trim() || !form.ville.trim() || !form.codePostal.trim() || !form.pays.trim())
      return "Veuillez renseigner votre adresse complète.";

    if (!noNumberRegex.test(form.ville)) return "Ville invalide (pas de chiffres).";
    if (!noNumberRegex.test(form.pays)) return "Pays invalide (pas de chiffres).";

    if (!cpRegex.test(form.codePostal)) return "Code postal invalide (seulement des chiffres).";

    if (!form.email.trim() || !emailRegex.test(form.email))
      return "Veuillez saisir un email valide.";

    if (!form.mdp) return "Veuillez saisir un mot de passe.";
    if (form.mdp.length < 6) return "Le mot de passe doit faire au moins 6 caractères.";

    if (form.mdp !== form.confirm) return "Les mots de passe ne correspondent pas.";

    return null;
};

export const validationInscriptionEntrepriseForm = (form) => {

    if (!form.nomEntreprise.trim())
      return "Veuillez renseigner le nom de votre entreprise.";

    if (!form.siret.trim() || !cpRegex.test(form.siret))
      return "N° siret invalide (seulement des chiffres).";

    if (!form.adresse1.trim() || !form.ville.trim() || !form.codePostal.trim() || !form.pays.trim())
      return "Veuillez renseigner votre adresse complète.";

   
    if (!noNumberRegex.test(form.ville)) return "Ville invalide (pas de chiffres).";
    if (!noNumberRegex.test(form.pays)) return "Pays invalide (pas de chiffres).";

    if (!cpRegex.test(form.codePostal)) return "Code postal invalide (seulement des chiffres).";

    if (!form.email.trim() || !emailRegex.test(form.email))
      return "Veuillez saisir un email valide.";

    if (!form.mdp) return "Veuillez saisir un mot de passe.";
    if (form.mdp.length < 6) return "Le mot de passe doit faire au moins 6 caractères.";

    if (form.mdp !== form.confirm) return "Les mots de passe ne correspondent pas.";

    return null;
};