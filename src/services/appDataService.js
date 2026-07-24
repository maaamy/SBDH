import  api  from "../utils/api";

const API_APP_DATA_URL = "/app-data"; 

export const fetchCategories = async () => {
  const res = await api.get(`${API_APP_DATA_URL}/categories`);
  return res.data.categories;
}

export const fetchAttributes = async () => {
  const res = await api.get(`${API_APP_DATA_URL}/attributes`);
  return res.data.attributes;
}

export const fetchBrands = async () => {
    const res = await api.get(`${API_APP_DATA_URL}/brands`);
    return res.data.brands;
};