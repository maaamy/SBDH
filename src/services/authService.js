import  api  from "../utils/api";

const API_AUTH_URL = "/auth"; 

export const verifyToken = async () => {
  const res = await api.get(`${API_AUTH_URL}/verify`);
  return res.data.user;
}
export const inscriptionClient = async (formData) => {
  const res = await api.post(`${API_AUTH_URL}/inscription-client`, formData);
  return res.data.user; 
};

export const inscriptionEntreprise = async (formData) => {
  const res = await api.post(`${API_AUTH_URL}/inscription-entreprise`, formData);
  return res.data.user; 
};


export const connexionClient = async ({ email, mdp }) => {
  const res = await api.post(`${API_AUTH_URL}/connexion-client`, { email, mdp });
  return res.data.user;
};

export const connexionEntreprise = async ({ email, siret, mdp }) => {
  const res = await api.post(`${API_AUTH_URL}/connexion-entreprise`, { email, siret, mdp });
  return res.data.user; 
}

export const connexionClientGoogle = async ({ token }) => {
  const res = await api.post(`${API_AUTH_URL}/connexion-client/google`, {
    token
  });
  return res.data.user;
};

export const connexionEntrepriseGoogle = async ({ token, siret }) => {
  const res = await api.post(`${API_AUTH_URL}/connexion-entreprise/google`, {
    token, siret
  });
  return res.data.user;
};

export const logout = async () => {
 await api.post(`${API_AUTH_URL}/logout`);
} 