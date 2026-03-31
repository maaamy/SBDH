import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; 

export const inscriptionClient = async (formData) => {
  const res = await axios.post(`${API_URL}/inscription-client`, formData);
  return res.data; 
};

export const inscriptionEntreprise = async (formData) => {
  const res = await axios.post(`${API_URL}/inscription-entreprise`, formData);
  return res.data; 
};


export const connexionClient = async ({ email, mdp }) => {
  const res = await axios.post(`${API_URL}/connexion-client`, { email, mdp });
  return res.data;
};

export const connexionEntreprise = async ({ email, siret, mdp }) => {
  const res = await axios.post(`${API_URL}/connexion-entreprise`, { email, siret, mdp });
  return res.data; 
}

export const connexionClientGoogle = async ({ token }) => {
  const res = await axios.post(`${API_URL}/connexion-client/google`, {
    token
  });
  return res.data;
};

export const connexionEntrepriseGoogle = async ({ token, siret }) => {
  const res = await axios.post(`${API_URL}/connexion-entreprise/google`, {
    token, siret
  });
  return res.data;
};