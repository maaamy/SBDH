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

export const fetchProductsEnterprise = async (enterpriseId) => {
  const res = await api.get(`${API_ENTERPRISE_URL}/products/${enterpriseId}`);
  return res.data.enterprise;
};

export const deleteVariantProduct = async (variantId) => {
  const res = await api.delete(`${API_ENTERPRISE_URL}/product/${variantId}`);
  return res.data.enterprise;
};

export const updateVariantProduct = async (variant) => {
    const res = await api.put(`${API_ENTERPRISE_URL}/variant/${variant.id}`, {
        prix: variant.prix,
        stock: variant.stock,
        est_active: variant.est_active,
    });
    return res.data.variant;
};

export const fetchProductsWithAvis = async (enterpriseId) => {
    const res = await api.get(`${API_ENTERPRISE_URL}/avis/${enterpriseId}`);
    return res.data.products;
};

