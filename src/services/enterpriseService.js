import  api  from "../utils/api";

const API_ENTERPRISE_URL = "/profil-entreprise"; 

export const fetchEnterprise = async ( id ) => {
  const res = await api.get(`${API_ENTERPRISE_URL}/${id}`);
  return res.data.enterprise;
}

export const updateEnterpriseProfile = async ( form ) => {

  const res = await api.post(`${API_ENTERPRISE_URL}/${form.id}`, form);
  return res.data.enterprise;
}

export const addProduct = async (form, variants = null, picture = null) => {

  const formData = new FormData();

  formData.append("form", JSON.stringify(form));       
  formData.append("variants", JSON.stringify(variants)); 
  if (picture) {
    formData.append("picture", picture); 
  }
  const res = await api.post(`${API_ENTERPRISE_URL}/add-product`, formData);
  return res.data.produit;
};
