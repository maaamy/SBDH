import  api  from "../utils/api";

const API_CUSTOMER_URL = "/profil"; 

export const fetchCustomer = async ( id ) => {
  const res = await api.get(`${API_CUSTOMER_URL}/${id}`);
  return res.data.customer;
}

export const updateCustomerProfile = async ( form ) => {

  const res = await api.post(`${API_CUSTOMER_URL}/${form.id}`, form);
  return res.data.customer;
}

