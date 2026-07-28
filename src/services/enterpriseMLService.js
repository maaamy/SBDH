import fastapi from "../utils/fastapi";

const API_ENTERPRISE_ML_URL = "/entreprise"; 


export const fetchDashboard = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/dashboard/${enterpriseId}`);
    return res.data;
};

export const fetchProducts = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/products/${enterpriseId}`);
    return res.data;
};

export const fetchInventory = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/stock/${enterpriseId}`);
    return res.data;
};

export const fetchCustomers = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/clients/${enterpriseId}`);
    return res.data;
};

export const fetchReviews = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/reviews/${enterpriseId}`);
    return res.data;
};

export const fetchFinance = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/finance/${enterpriseId}`);
    return res.data;
};

export const fetchTopProducts = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/top-products/${enterpriseId}`);
    return res.data;
};

export const fetchOrdersStatus = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/orders-status/${enterpriseId}`);
    return res.data;
};

export const fetchDailySales = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/daily-sales/${enterpriseId}`);
    return res.data;
};

export const fetchSalesProducts = async (enterpriseId) => {
    const res = await fastapi.get(`${API_ENTERPRISE_ML_URL}/sales-products/${enterpriseId}`);
    return res.data;
};