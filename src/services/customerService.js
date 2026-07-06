import  api  from "../utils/api";

const API_CUSTOMER_URL = "/profil"; 
const API_PRODUCTS_URL = "/produits";


export const fetchCustomer = async ( id ) => {
  const res = await api.get(`${API_CUSTOMER_URL}/${id}`);
  return res.data.customer;
}

export const updateCustomerProfile = async ( form ) => {

  const res = await api.post(`${API_CUSTOMER_URL}/${form.id}`, form);
  return res.data.customer;
}

export const fetchAllProducts = async () => {
    const res = await api.get(`${API_PRODUCTS_URL}/`);
    return res.data.products;
};

export const fetchProductById = async (productId) => {
    const res = await api.get(`${API_PRODUCTS_URL}/${productId}`);
    return res.data.product;
};